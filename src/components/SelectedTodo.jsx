import React, { useEffect, useState, useRef } from "react";
import Slider from "@material-ui/core/Slider";

import { useMutation, gql } from "@apollo/client";

import { format } from "timeago.js";
import { CircularProgress } from "@material-ui/core";

const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo($id: Int, $percentage: numeric, $status: String) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { percentage: $percentage, status: $status }
    ) {
      affected_rows
      returning {
        status
        id
        percentage
        todo
        created_at
        updated_at
      }
    }
  }
`;

const SelectedTodo = ({ selectedItem, setSelected }) => {
  const [updateTodo, { data, loading }] = useMutation(UPDATE_TODO_MUTATION);
  const [percent, setPercent] = useState(selectedItem?.percentage);
  const prevPercent = useRef(selectedItem.percentage);
  useEffect(() => {
    if (prevPercent.current !== percent) {
      prevPercent.current = percent;
      updateTodo({
        variables: {
          id: selectedItem.id,
          percentage: percent,
          status: "TODO",
        },
      });
    }
  }, [updateTodo, percent, selectedItem]);
  return (
    <div className="m-8 p-6 bg-gradient-to-r from-gray-800 hover:from-gray-700 to-gray-700 hover:to-gray-800 rounded-xl shadow-inner text-left space-y-3">
      <h2 className="text-2xl font-bold">{selectedItem?.todo}</h2>
      <h3 className="text-xl font-thin text-gray-400 drop-shadow-md">
        Added {format(selectedItem?.created_at)}
      </h3>
      <p>Last Updated {format(selectedItem?.updated_at)}</p>
      <hr className="pb-4 mt-24" />
      <p className=" font-thin">
        Progress
        {loading && <CircularProgress className size={10} />}
      </p>

      <Slider
        disabled={loading}
        getAriaValueText={(v) => `${v} %`}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        value={percent}
        onChangeCommitted={(e, nv) => {
          setPercent(nv);
        }}
        defaultValue={60}
        min={10}
        max={100}
      />
      <p className="p-0 m-0 font-thin">Status:</p>
      <p className="p-0 m-0 font-bold text-2xl">{selectedItem.status}</p>
      <button
        className="bg-blue-500 p-2 rounded hover:bg-blue-600 shadow-xl top-4"
        onClick={async () => {
          await updateTodo({
            variables: {
              id: selectedItem.id,
              percentage: selectedItem.percentage,
              status: "DONE",
            },
          });
          setSelected(false);
        }}
      >
        Mark as Completed
      </button>
    </div>
  );
};

export default SelectedTodo;
