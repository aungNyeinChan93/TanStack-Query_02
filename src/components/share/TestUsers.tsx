import React from "react";
import useCreateQueryOption from "../../queryOptions/CreateUsersQueryOption";
import { useQuery } from "@tanstack/react-query";

const TestUsers = () => {
  const { data } = useQuery(useCreateQueryOption());
  console.log(data);

  return (
    <React.Fragment>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Fragment>
  );
};

export default TestUsers;
