import { useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TestError from "./TestError";

const fetchUsers = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) throw new Error("users fetching erorr");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const TestUseSuspenseQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 30,
  });
  return (
    <React.Fragment>
      <Suspense fallback={<>Loading </>}>
        <ErrorBoundary FallbackComponent={TestError}>
          <pre>{JSON.stringify(data?.users, null, 2)}</pre>
        </ErrorBoundary>
      </Suspense>
    </React.Fragment>
  );
};

export default TestUseSuspenseQuery;
