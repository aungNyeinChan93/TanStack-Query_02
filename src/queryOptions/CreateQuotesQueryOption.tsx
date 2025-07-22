import { queryOptions } from "@tanstack/react-query";

const CreateQuotesQueryOption = () => {
  return queryOptions({
    queryKey: ["quotes"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/quotes");
      const { quotes } = await response.json();
      return quotes;
    },
    staleTime: 10000,
  });
};

export default CreateQuotesQueryOption;
