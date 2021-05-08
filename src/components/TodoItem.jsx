import React from "react";

import { useMutation, gql } from "@apollo/client";

const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo($status: String, $id: Int) {
    update_todos(where: { id: { _eq: $id } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;

const TodoItem = ({ i, ix }) => {
  const [updateTodo, { data }] = useMutation(UPDATE_TODO_MUTATION);

  return (
    <>
      <li className="font-thin text-xl text-left hover:bg-gray-600 cursor-pointer">
        <div class="flex items-center mr-4 cursor-pointer">
          <input
            type="checkbox"
            class="h-8 w-8 form-checkbox text-pink-600"
            id={ix}
            onChange={(e) =>
              updateTodo({
                variables: {
                  id: i.id,
                  status: "DONE",
                },
              })
            }
          />
          <label
            for={ix}
            className="select-none pl-3 p-3 flex-grow cursor-poin`ter"
          >
            {i.todo}
          </label>
        </div>
      </li>
      <hr className="border-gray-700" />
    </>
  );
};

export default TodoItem;
