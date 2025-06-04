import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  limit: number;
  setLimit(l: number): void;
  bucketId: string;
  setBucketId(b: string): void;
  start: string;
  setStart(s: string): void;
  end: string;
  setEnd(e: string): void;
}

export function EventFilter(props: Props) {
  const {
    limit,
    bucketId,
    start,
    end,
    setLimit,
    setBucketId,
    setStart,
    setEnd,
  } = props;
  return (
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
  );
}
