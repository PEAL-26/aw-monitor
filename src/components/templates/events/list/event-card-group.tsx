import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getFileName } from "@/helpers/file";
import { dayjs } from "@/lib/dayjs";
import { Clock, Folder } from "lucide-react";

interface Props {
  event: { project: string; duration: number };
  onClick?(): void;
}

export function EventCardGroup(props: Props) {
  const { event, onClick } = props;
  return (
    <Card
      className="hover:cursor-pointer transition-all hover:bg-muted/20 duration-300 h-fit"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{getFileName(event.project)}</span>
          <Folder className="mr-2 h-4 w-4 text-[#3a7935]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3" />
          <p className="font-semibold">Duration: {event.duration}s</p>
        </div>
      </CardContent>
    </Card>
  );
}
