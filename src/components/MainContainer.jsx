import React from "react";
import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query MyQuery {
    todos {
      todo
      status
    }
  }
`;

const MainContainer = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  return (
    <div class="lg:flex h-screen bg-gray-800 text-gray-200 overflow-y-auto">
      <div className="flex-none w-1/3 pt-10">
        <h1 className="text-6xl pl-10 text-left lg:text-center">
          Today <span className="text-sm font-bold cursor-pointer">\/</span>
        </h1>
      </div>
      <div className="flex-grow pt-20 p-3 lg:pt-60">
        <ul>
          {data?.todos?.map((i, ix) => (
            <>
              <li className="font-thin text-xl text-left hover:bg-gray-600 cursor-pointer">
                <div class="flex items-center mr-4 cursor-pointer">
                  <input
                    type="checkbox"
                    class="h-8 w-8 form-checkbox text-pink-600"
                    id={ix}
                  />
                  <label
                    for={ix}
                    className="select-none pl-3 p-3 flex-grow cursor-pointer"
                  >
                    {i.todo}
                  </label>
                </div>
              </li>
              <hr className="border-gray-700" />
            </>
          ))}
          <div className="w-full flex mt-3">
            <button class="p-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex-none">
              +
            </button>
            <textarea class="focus:outline-none focus:ring-2 focus:ring-purple-600 flex-grow bg-transparent border-b-2 border-gray-700" />
          </div>
        </ul>
        {/* <pre>{JSON.stringify(data.todos.map(i=>i.todo), null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default MainContainer;
