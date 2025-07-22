import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const TestInfiniteQuery = () => {
  const [page, setPage] = useState(1);

  const { data } = useInfiniteQuery({
    queryKey: ["todos", page],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/todos/${page}`);
      return await response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (current) => {
      return current + 1;
    },
  });

  console.log(data?.pageParams);
  const todo = data?.pages.flatMap((t) => t);
  console.log(todo);

  return (
    <React.Fragment>
      <section>
        <button type="button" onClick={() => setPage((pre: number) => pre + 1)}>
          next
        </button>
      </section>
    </React.Fragment>
  );
};

export default TestInfiniteQuery;
