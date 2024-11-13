"use client";
import { useEffect, useState } from "react";
import { Clock, Code, Folder, File, Loader2Icon } from "lucide-react";
import { LayoutGridIcon, StretchHorizontalIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  listEventsService,
  ListEventsResponseData,
  ListResponseData,
} from "@/services/events";
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
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [bucketId, setBucketId] = useState("");

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
          limit: 12,
          page,
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
  }, [page]);

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
        <Card className="aspect-video rounded-xl bg-muted/50">
          <CardHeader>
            <CardTitle>Event Filters</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="limit">Limit</Label>
                  <Input
                    id="limit"
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="bucket-id">Bucket ID</Label>
                  <Input
                    id="bucket-id"
                    value={bucketId}
                    onChange={(e) => setBucketId(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start">Start Date</Label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end">End Date</Label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
              </div>
              <Button className="w-full">Apply Filters</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-end">
        <ToggleGroup type="single">
          <ToggleGroupItem value="grid" aria-label="Toggle grid">
            <LayoutGridIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="Toggle list">
            <StretchHorizontalIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"> */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {response.data.map((event) => (
          <Card key={`${event.id}-${event.timestamp}`}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Event {event.id}</span>
                <Clock className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-[#d9d9d9] opacity-70">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
                <p className="font-semibold">Duration: {event.duration}s</p>
                <div className="flex items-center">
                  <Code className="mr-2 h-4 w-4 text-[#3a7935]" />
                  <span>{event.data.language}</span>
                </div>
                <div className="flex items-center">
                  <Folder className="mr-2 h-4 w-4 text-[#3a7935]" />
                  <span>{getFileName(event.data.project)}</span>
                </div>
                <div className="flex items-center">
                  <File className="mr-2 h-4 w-4 text-[#3a7935]" />
                  <span
                    className="text-sm truncate"
                    title={getFileName(event.data.file)}
                  >
                    {getFileName(event.data.file)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
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
      </div>
      {/* </div> */}
    </div>
  );
}
