/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryOptions } from "@tanstack/react-query";

interface postParams {
  id?: number;
  page?: number;
  limit?: number;
}

const postQueryOption = (params?: postParams, options?: any) => {
  return queryOptions({
    queryKey: ["posts", params],
    queryFn: async () => {
      const { id } = params ?? {};
      const response = await fetch(`https://dummyjson.com/posts/${id || ""}`);
      const data = await response.json();
      if (!response.ok) throw new Error("posts data fetching fail!");
      return data;
    },
    ...options,
    // onSuccess: () => {
    //   console.log("success");
    // },
    // onError: (error: Error) => {
    //   console.log(error.message);
    // },
  });
};

export default postQueryOption;
