import React, { useEffect, useReducer, createContext } from "react";
import { listBoards } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { ACTION_TYPES } from "../actions";
import { boardsReducer } from "../reducers";

const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
  const initialState = {
    boards: [],
    status: "idle",
  };
  // rename state to boards
  const [boardsState, boardsDispatch] = useReducer(boardsReducer, initialState);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        boardsDispatch({ type: ACTION_TYPES.GET_BOARDS });
        const boardData = await API.graphql(graphqlOperation(listBoards));
        const boards = boardData.data.listBoards.items;
        boardsDispatch({
          type: ACTION_TYPES.GET_BOARDS_SUCCESS,
          value: boards,
        });
      } catch (err) {
        console.log("error fetching boards");
        boardsDispatch({ type: ACTION_TYPES.GET_BOARDS_ERROR });
      }
    };
    fetchBoards();
  }, []);

  return (
    <BoardsContext.Provider value={{ boardsState, boardsDispatch }}>
      {children}
    </BoardsContext.Provider>
  );
};

export default BoardsContext;
