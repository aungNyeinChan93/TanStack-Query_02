import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
interface postParams {
    id?: number;
    page?: number;
    limit?: number;
}

const postQueryOption = (
    params?: postParams,
    options?: Omit<UseQueryOptions, "queryKey" | "queryFn">
) => {
    return queryOptions({
        ...options,
        queryKey: ["posts", params],
        queryFn: async () => {
            const { id, page = 1, limit = 10 } = params ?? {};
            const skip = limit * (page - 1);
            const response = await fetch(
                `https://dummyjson.com/posts/${id || ""}?limit=${limit ?? 10
                }&skip=${skip}`
            );
            const data = await response.json();
            if (!response.ok) throw new Error("posts data fetching fail!");
            return data;
        },
    });
};

export default postQueryOption;
