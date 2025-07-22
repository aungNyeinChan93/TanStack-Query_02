/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryOptions } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch(`https://dummyjson.com/users`);
  const { users } = await response.json();
  return users;
};

const CreateUsersQueryOption = (options?: any) => {
  return queryOptions({
    ...options,
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 10000 * 60 * 30,
  });
};

export default CreateUsersQueryOption;
