import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";

interface ProductQueryParams {
  id?: number;
  page?: number;
  limit?: number;
}

const productQueryOption = (
  params?: ProductQueryParams,
  options?: Omit<UseQueryOptions, "queryKey" | "queryFn">
) => {
  return queryOptions({
    ...options,
    queryKey: ["products", params],
    queryFn: async () => {
      const { id, page = 1, limit = 10 } = params ?? {};
      const skip = limit * (page - 1);
      const response = await fetch(
        `https://dummyjson.com/products/${id || ""}?limit=${
          limit ?? 10
        }&skip=${skip}`
      );
      const data = await response.json();
      return id ? data : data.products;
    },
  });
};

export default productQueryOption;
