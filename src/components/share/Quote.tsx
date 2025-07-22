import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import TestError from "./TestError";

const demoQuotes = [
  { id: 1, quote: "demo quote 1", author: "chan" },
  { id: 2, quote: "demo quote 2", author: "susu" },
];
const fetchQuotes = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/quotes`);
    if (!response.ok) throw new Error("Quote fetching fail");
    const data = await response.json();
    return data.quotes;
  } catch (error) {
    console.error(error);
  }
};

// prefetch
const client = new QueryClient();
const prefetch = () => {
  client.prefetchQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
  });
};

const Quote = () => {
  useEffect(() => {
    prefetch();
  }, []);

  const {
    data: TopTenQuotes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
    staleTime: 6000,
    select: (data) => {
      return data.slice(0, 10);
    },
    refetchOnWindowFocus: true, //default true
    refetchInterval: 1000 * 60 * 60,
    placeholderData: demoQuotes,
    // initialData: demoQuotes, // initialData is cached
  });

  if (isLoading) return <>Loading . . .</>;
  if (error) return <TestError error={error} resetErrorBoundary={refetch} />;
  return (
    <React.Fragment>
      <section className="w-4/5 mx-auto h-screen p-5 my-2 rounded-2xl">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-red-600 bg-clip-text text-transparent">
          Quotes!
        </h1>
        {TopTenQuotes &&
          Array.isArray(TopTenQuotes) &&
          TopTenQuotes?.map((quote) => {
            return (
              <div
                className="p-4 px-3 bg-slate-300 rounded-2xl my-1 relative"
                key={quote.id}
              >
                {quote.quote}
                <button
                  type="button"
                  className=" absolute right-4 text-sm font-mono text-red-600"
                >
                  Delete
                </button>
              </div>
            );
          })}
      </section>
    </React.Fragment>
  );
};

export default Quote;
