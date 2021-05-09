import React, { useEffect, useState } from "react";
import { gql, useSubscription } from "@apollo/client";

import { SET_ERROR } from "../actions/state";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import SelectedTodo from "./SelectedTodo";

const TODOS_SUBSCRIPTION = gql`
  subscription MyQuery {
    todos(where: { status: { _eq: "TODO" } }) {
      todo
      status
      id
      created_at
      updated_at
      percentage
    }
  }
`;

const MainContainer = ({ dispatch, state }) => {
  const { loading, error, data } = useSubscription(TODOS_SUBSCRIPTION);
  const [selectedItem, setSelected] = useState(false);
  useEffect(() => {
    if (error !== undefined) {
      dispatch({ type: SET_ERROR, payload: "ERROR" });
    }
  }, [error, dispatch]);

  return (
    <div class="lg:flex h-screen bg-gray-900 text-gray-200 overflow-y-auto">
      <div className="flex-none lg:w-1/3 pt-10 justify-start">
        <h1 className="lg:text-6xl text-4xl pl-10 text-left">Todos App</h1>
        {data?.todos?.length > 0 && (
          <h1 className="lg:text-2xl md:text-sm pl-12 text-left text-gray-500 pt-4">
            {data?.todos?.length} Pending item{data?.todos?.length !== 1 && "s"}
          </h1>
        )}
        {selectedItem && <SelectedTodo selectedItem={selectedItem} setSelected={setSelected}/>}
      </div>
      <div className="flex-grow pt-10 p-3 lg:pt-10">
        {loading && <h1>Loading...</h1>}
        <ul>
          {data?.todos?.length === 0 && (
            <h1 className="text-gray-500">Nothing is here :(</h1>
          )}
          {data?.todos?.map((i, ix) => (
            <TodoItem key={i?.id} {...{ i, ix, selectedItem, setSelected }} />
          ))}
          <NewTodo />
        </ul>
        {/* <pre>{JSON.stringify(data.todos.map(i=>i.todo), null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default MainContainer;
