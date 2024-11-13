import { type ApiRequestConfig, api } from "@/lib/axios";

export type ListBucketsParams = {
  start?: Date;
  end?: Date;
  limit?: number;
};

export type ListBucketsData = {
  language: string;
  project: string;
  file: string;
};

export type Bucket = {
  id: string;
  created: string;
  name: string | null;
  type: string;
  client: string;
  hostname: string;
  data: unknown;
  last_updated: string;
};

export type ListBucketsResponseData = {
  [key: string]: Bucket;
};

export async function getBucketsService(config?: ApiRequestConfig) {
  return api.get<ListBucketsResponseData>(`/0/buckets`, {
    ...config,
  });
}
