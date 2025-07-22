import { queryOptions } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch(`https://dummyjson.com/users`);
  const { users } = await response.json();
  return users;
};

const CreateUsersQueryOption = () => {
  return queryOptions({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 10000 * 60 * 30,
  });
};

export default CreateUsersQueryOption;
