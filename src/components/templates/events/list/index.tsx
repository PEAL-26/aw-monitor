"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { LayoutGridIcon, StretchHorizontalIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  listEventsService,
  ListEventsResponseData,
  ListResponseData,
} from "@/services/events";
import { EventCardGrid } from "./event-card-grid";
import { EventFilter } from "./event-filter";
import { cn } from "@/lib/utils";
import { EventCardList } from "./event-card-list";
import { EventCardGroup } from "./event-card-group";
import { getFileName } from "@/helpers/file";

const bucketData = {
  id: "aw-watcher-vscode_peal",
  created: "2024-11-05T14:08:02.582862+00:00",
  name: null,
  type: "app.editor.activity",
  client: "aw-watcher-vscode",
  hostname: "peal",
  data: {},
};

export function EventsScreen() {
  const [limit, setLimit] = useState(100);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [bucketId, setBucketId] = useState("");
  const [groupItems, setGroupItems] = useState<"grid" | "list">("grid");

  const [details, setDetails] = useState<{ open?: boolean; project?: string }>(
    {}
  );
  const [showDetails, setShowDetails] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<
    ListResponseData<ListEventsResponseData>
  >({
    data: [],
    currentPage: 1,
    next: null,
    prev: null,
    totalItems: 0,
    totalPages: 0,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await listEventsService("aw-watcher-vscode_peal", {
          limit,
          page,
          start: start.split("T")?.[0] ?? undefined,
          end: end.split("T")?.[0] ?? undefined,
        });

        setResponse((prev) => {
          return {
            ...response,
            data: [...prev.data, ...response.data],
          };
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, limit, start, end]);

  useEffect(() => {
    let timeout = undefined;

    if (details?.open) {
      timeout = setTimeout(() => {
        setShowDetails(true);
      }, 1000);
    } else {
      setShowDetails(false);
    }

    return () => clearTimeout(timeout);
  }, [details]);

  let projectsCount = 0;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <Card className="aspect-video rounded-xl bg-muted/50">
          <CardHeader>
            <CardTitle>Bucket Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {bucketData.id}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(bucketData.created).toLocaleString()}
              </p>
              <p>
                <strong>Type:</strong> {bucketData.type}
              </p>
              <p>
                <strong>Client:</strong> {bucketData.client}
              </p>
              <p>
                <strong>Hostname:</strong> {bucketData.hostname}
              </p>
            </div>
          </CardContent>
        </Card>
        <EventFilter
          limit={limit}
          setLimit={setLimit}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          bucketId={bucketId}
          setBucketId={setBucketId}
        />
      </div>
      <div className="flex items-center justify-end">
        <ToggleGroup type="single" value={groupItems} defaultValue="grid">
          <ToggleGroupItem
            value="grid"
            aria-label="Toggle grid"
            onClick={() => {
              setGroupItems("grid");
            }}
          >
            <LayoutGridIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="Toggle list"
            onClick={() => {
              setGroupItems("list");
            }}
          >
            <StretchHorizontalIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="relative h-[100vh] overflow-hidden">
        <div
          data-show={!details.open}
          className={cn(
            "absolute inset-0 transition-all data-[show=true]:left-0 data-[show=false]:-left-full data-[show=false]:w-full"
          )}
        >
          <div
            className={cn(
              "gap-6",
              groupItems === "grid" && "grid md:grid-cols-2 lg:grid-cols-3",
              groupItems === "list" && "flex flex-col"
            )}
          >
            {!details.open && (
              <>
                {(() => {
                  const lastProject: string[] = [];
                  let duration: Record<string, number> = {};
                  return response.data.map((e) => {
                    const event = {
                      project: getFileName(e.data.project),
                      duration: e.duration,
                    };

                    const durationFound = Object.entries(duration).find(
                      ([p]) => p === event.project
                    );
                    if (durationFound) {
                      duration[event.project] += event.duration;
                    } else {
                      duration = {
                        ...duration,
                        [event.project]: event.duration,
                      };
                    }

                    event.duration = duration[event.project];

                    if (lastProject.includes(event.project)) {
                      return null;
                    } else {
                      lastProject.push(event.project);
                    }

                    projectsCount = lastProject.length;
                    return (
                      <EventCardGroup
                        key={`${e.id}-${e.timestamp}`}
                        event={event}
                        onClick={() =>
                          setDetails({ project: event.project, open: true })
                        }
                      />
                    );
                  });
                })()}

                {isLoading && (
                  <div className="md:col-span-2 lg:col-span-3 justify-center items-center grid flex-1 h-full">
                    <Loader2Icon className="animate-spin size-10" />
                  </div>
                )}
                {projectsCount >= 12 && (
                  <div className="grid col-span-3 justify-center">
                    {!isLoading && response.next && (
                      <Button
                        onClick={() => {
                          if (response.next) {
                            setPage(response.next);
                          }
                        }}
                        className="w-fit"
                      >
                        Mais
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div
          data-show={!!details?.open}
          className={cn(
            "absolute inset-0 transition-all data-[show=true]:left-0 data-[show=false]:-left-full data-[show=false]:w-0 flex flex-col"
          )}
        >
          {details?.open === true && (
            <>
              <div className="flex items-center gap-2 col-span-3 border text-card-foreground shadow rounded-xl bg-muted/50 px-3 py-2 mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setDetails({})}
                  className="bg-transparent rounded p-0 w-10 h-10"
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <span className="font-semibold leading-none tracking-tight">
                  {details?.project}
                </span>
              </div>
              <div
                className={cn(
                  "gap-6 flex-1 h-full overflow-y-auto",
                  groupItems === "grid" && "grid md:grid-cols-2 lg:grid-cols-3",
                  groupItems === "list" && "flex flex-col"
                )}
              >
                {details?.open && !showDetails && (
                  <div className="md:col-span-2 lg:col-span-3 justify-center items-center grid flex-1 h-full">
                    <Loader2Icon className="animate-spin size-10" />
                  </div>
                )}

                {showDetails && (
                  <>
                    {groupItems === "grid" &&
                      response.data
                        .filter(
                          (d) => getFileName(d.data.project) === details.project
                        )
                        .map((event) => (
                          <EventCardGrid
                            key={`${event.id}-${event.timestamp}`}
                            event={event}
                          />
                        ))}
                    {groupItems === "list" &&
                      response.data
                        .filter(
                          (d) => getFileName(d.data.project) === details.project
                        )
                        .map((event) => (
                          <EventCardList
                            key={`${event.id}-${event.timestamp}`}
                            event={event}
                          />
                        ))}

                    {isLoading && (
                      <div className="md:col-span-2 lg:col-span-3 justify-center items-center grid flex-1 h-full">
                        <Loader2Icon className="animate-spin size-10" />
                      </div>
                    )}

                    <div className="grid col-span-3 justify-center">
                      {!isLoading && response.next && (
                        <Button
                          onClick={() => {
                            if (response.next) {
                              setPage(response.next);
                            }
                          }}
                          className="w-fit"
                        >
                          Mais
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
