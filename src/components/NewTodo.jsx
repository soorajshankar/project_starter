import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_TODO_MUTATION = gql`
  mutation AddTodo(
    $status: String = ""
    $todo: String = ""
    $percentage: numeric = ""
  ) {
    insert_todos(
      objects: { percentage: $percentage, todo: $todo, status: $status }
    ) {
      affected_rows
    }
  }
`;
const NewTodo = () => {
  const [text, setText] = useState("");
  const [addTodo, { data }] = useMutation(ADD_TODO_MUTATION);
  console.log(data);

  return (
    <div className="w-full flex mt-3">
      <textarea
        class="focus:outline-none focus:ring-2 focus:ring-purple-600 flex-grow bg-transparent border-b-2 border-gray-700"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Add todo here"
      />
      <button
        class="p-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex-none"
        onClick={() => {
          if (text && text?.length > 0) {
            addTodo({
              variables: {
                status: "TODO",
                todo: text,
                percentage: 0,
              },
            });
            setText("");
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

export default NewTodo;
