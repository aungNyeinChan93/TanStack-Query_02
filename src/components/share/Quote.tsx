import { useQuery } from "@tanstack/react-query";
import React from "react";
import TestError from "./TestError";

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

const Quote = () => {
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
    refetchOnWindowFocus: false, //default true
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
