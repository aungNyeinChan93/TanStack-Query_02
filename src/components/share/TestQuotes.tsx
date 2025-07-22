import { useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import CreateQuotesQueryOption from "../../queryOptions/CreateQuotesQueryOption";

const TestQuotes = () => {
  const { data: quotes } = useSuspenseQuery(CreateQuotesQueryOption());

  return (
    <React.Fragment>
      <Suspense fallback={<>Loading</>}>
        <section>
          <pre>{JSON.stringify(quotes, null, 2)}</pre>
        </section>
      </Suspense>
    </React.Fragment>
  );
};

export default TestQuotes;
