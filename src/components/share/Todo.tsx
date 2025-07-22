import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const fetchTodos = async () => {
  const response = await fetch("https://dummyjson.com/todos");
  const { todos } = await response.json();
  return todos;
};

const Todo = () => {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 3000,
  });

  const { mutate, data: addData } = useMutation({
    mutationFn: async (newTodo: Todo) => {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const addData = await response.json();
      return addData;
    },
  });
  console.log(data);
  console.log("add todo", addData);

  useEffect(() => {
    mutate({ id: 999, todo: "test todo", userId: 4, completed: false });
  }, [mutate]);

  return (
    <React.Fragment>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Fragment>
  );
};

export default Todo;
