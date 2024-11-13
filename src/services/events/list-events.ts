import { type ApiRequestConfig, api } from "@/lib/axios";

export type ListEventsParams = {
  start?: Date;
  end?: Date;
  limit?: number;
  page?: number;
};

export type ListEventsData = {
  language: string;
  project: string;
  file: string;
};

export type ListEventsResponseData = {
  id: string;
  timestamp: string;
  duration: number;
  data: ListEventsData;
};

type PaginationParams = {
  totalItems: number;
  page: number; // número da página que queremos (começando em 1)
  limit: number; // número máximo de itens por página
};

export interface ListResponseData<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  prev: number | null;
  next: number | null;
}

export async function listEventsService(
  bucketId: string,
  params?: ListEventsParams,
  config?: ApiRequestConfig
) {
  const { limit = 10, page = 1, ...param } = params || {};
  const [totalItems, response] = await Promise.all([
    api.get<number>(`/0/buckets/${bucketId}/events/count`, {
      ...config,
      params: { ...param },
    }),
    api.get<ListEventsResponseData[]>(`/0/buckets/${bucketId}/events`, {
      ...config,
      params: { limit: limit * 10, ...param },
    }),
  ]);

  return paginateData(response, { totalItems, page, limit });
}

function paginateData<T>(
  data: T[],
  { totalItems, page, limit }: PaginationParams
): ListResponseData<T> {
  // Calcular o total de itens e o total de páginas
  const totalPages = Math.ceil(totalItems / limit);

  // Garantir que a página solicitada esteja dentro dos limites
  const currentPage = Math.max(1, Math.min(page, totalPages));

  // Calcular o índice inicial e final para a página atual
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  // Obter os dados da página atual
  const pageData = data.slice(startIndex, endIndex);

  // Definir páginas anterior e próxima
  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  // Retornar o resultado no formato especificado
  return {
    data: pageData,
    totalItems,
    totalPages,
    currentPage,
    prev,
    next,
  };
}
