import React, { useEffect } from "react";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";

import { SET_ERROR } from "../actions/state";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";

const EXCHANGE_RATES = gql`
  subscription MyQuery {
    todos(where: { status: { _eq: "TODO" } }) {
      todo
      status
      id
    }
  }
`;

const MainContainer = ({ dispatch, state }) => {
  const { loading, error, data } = useSubscription(EXCHANGE_RATES);
  useEffect(() => {
    if (error !== undefined) {
      dispatch({ type: SET_ERROR, payload: "ERROR" });
    }
  }, [error, dispatch]);

  return (
    <div class="lg:flex h-screen bg-gray-900 text-gray-200 overflow-y-auto">
      <div className="flex-none w-1/3 pt-10 justify-start">
        <h1 className="text-6xl pl-10 text-left">Todos App</h1>
        <h1 className="text-2xl pl-12 text-left text-gray-500 pt-4">Pending Todos</h1>
      </div>
      <div className="flex-grow pt-20 p-3 lg:pt-60">
        {loading && <h1>Loading...</h1>}
        <ul>
          {data?.todos?.length === 0 && <h1 className="text-gray-500">Nothing is here!</h1>}
          {data?.todos?.map((i, ix) => (
            <TodoItem key={i?.id} {...{ i, ix }} />
          ))}
          <NewTodo />
        </ul>
        {/* <pre>{JSON.stringify(data.todos.map(i=>i.todo), null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default MainContainer;
