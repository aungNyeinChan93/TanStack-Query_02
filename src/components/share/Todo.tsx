import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const queryClient = new QueryClient();
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

// Todo Components
const Todo = () => {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 3000,
  });

  // create todo
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
    onMutate: (variables) => {
      console.log("variables", variables);
      console.log("variables", (variables.todo = "update on mutate state!"));
    },
    onSuccess: async (data, context) => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("context" + JSON.stringify(context));
      console.log("data" + JSON.stringify(data));
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
    onSettled: (data) => {
      console.log("this is like a finally block!");
      console.log(JSON.stringify(data), " on onSettle state!");
    },
  });

  console.log(data);
  console.log("add todo", addData);

  useEffect(() => {
    // create todo
    mutate({
      id: Number(Math.random()),
      todo: "test todo",
      userId: 4,
      completed: false,
    });
  }, [mutate]);

  // delete todo
  const { mutate: deleteMutate, data: deleteData } = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch("https://dummyjson.com/todos/" + id, {
        method: "DELETE",
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSettled: (data) => {
      alert(`${data.todo} was deleted!`);
    },
  });
  console.log("delete todo", deleteData);

  return (
    <React.Fragment>
      {data?.map((todo: Todo) => (
        <div
          key={todo.id}
          className="p-2 bg-slate-50 my-4 flex justify-between px-4 w-2/4 mx-auto"
        >
          <p>{todo?.todo}</p>
          <button
            type="button"
            className=" cursor-pointer"
            onClick={() => deleteMutate(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Todo;
