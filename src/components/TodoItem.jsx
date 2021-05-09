import React, { useState, useEffect } from "react";

import { useMutation, gql } from "@apollo/client";

import { format } from "timeago.js";

const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo($status: String, $id: Int) {
    update_todos(where: { id: { _eq: $id } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;

const TodoItem = ({ i, ix, selectedItem, setSelected = () => {} }) => {
  const [updateTodo, { data }] = useMutation(UPDATE_TODO_MUTATION);
  const [checked, setChecked] = useState(i?.status === "DONE");
  useEffect(() => {
    if (checked !== (i.status === "DONE"))
      updateTodo({
        variables: {
          id: i.id,
          status: checked ? "DONE" : "TODO",
        },
      });
  }, [checked, i, updateTodo]);
  return (
    <>
      <li
        className={`font-thin text-xl text-left pl-2 hover:bg-gray-600 cursor-pointer ${
          i?.id === selectedItem?.id && "bg-blue-500"
        }`}
        onClick={(e) => {
          setSelected(i);
          // console.log(">>>");
          // e.stopPropagation();
        }}
      >
        <div class="flex items-center mr-4 cursor-pointer">
          <input
            type="checkbox"
            class="h-8 w-8 form-checkbox text-pink-600"
            id={ix}
            checked={checked}
            onClick={(e) => {
              e.stopPropagation();
              setChecked(e.target.checked);
            }}
          />
          {/* <span className="pl-3">{formatDuration(new Date(i.created_at),new Date())}</span> */}
          <span className="select-none pl-3 p-3 flex-grow cursor-pointer">
            {i.todo}
          </span>
          <span className="pl-3 text-blue-300 drop-shadow font-base text-base">
            Added {format(i?.created_at)}
          </span>
          {/* <span className="text-yellow-500 font-bold">New </span> */}
        </div>
      </li>
      <hr className="border-gray-700" />
    </>
  );
};

export default TodoItem;
