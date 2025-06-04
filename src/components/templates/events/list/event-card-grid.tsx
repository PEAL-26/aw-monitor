import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getFileName } from "@/helpers/file";
import { dayjs } from "@/lib/dayjs";
import { ListEventsResponseData } from "@/services/events";
import { Clock, Code, File, Folder } from "lucide-react";

interface Props {
  event: ListEventsResponseData;
}

export function EventCardGrid(props: Props) {
  const { event } = props;
  return (
    <Card className="hover:bg-muted/20">
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
  );
}
