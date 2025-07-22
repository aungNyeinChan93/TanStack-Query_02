import { useQuery } from "@tanstack/react-query";
import React from "react";
import CommentQueryOption from "../../queryOptions/commentQueryOption";

const TestComments = () => {
  // single comment
  const { data: comment } = useQuery(
    CommentQueryOption({ id: 5 }, { staleTime: 3000 })
  );
  console.log(comment);

  //   select
  //   const addSelect = {
  //     select: (data: any) => {
  //       return data?.comment.map((d: any) => d.body + " select add");
  //     },
  //   };

  // comments
  const { data } = useQuery(CommentQueryOption({ page: 2, limit: 5 }));
  console.log(data!.comments);

  return (
    <React.Fragment>
      <section></section>
    </React.Fragment>
  );
};

export default TestComments;
