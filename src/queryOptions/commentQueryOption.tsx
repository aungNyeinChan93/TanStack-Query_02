import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";

interface CommentParams {
  id?: number;
  page?: number;
  limit?: number;
}

const CommentQueryOption = (
  params?: CommentParams,
  options?: Omit<UseQueryOptions, "queryKey" | "queryFn">
) => {
  return queryOptions({
    ...options,
    queryKey: ["comments", params],
    queryFn: async () => {
      const { id, limit = 10, page = 1 } = params ?? {};
      const skip = limit * (page - 1);
      const response = await fetch(
        `https://dummyjson.com/comments/${id || ""}?skip=${skip}&limit=${limit}`
      );
      const data = await response.json();
      return data;
    },
  });
};

export default CommentQueryOption;
