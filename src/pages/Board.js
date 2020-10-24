import React, { useState, useEffect, useReducer } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useParams, useHistory } from "react-router-dom";
import { getBoard, listLists } from "../graphql/queries";
import { notificationError } from "../utils";
import { List, DeleteBoard, CreateList } from "../components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ACTION_TYPES } from "../actions";
import { listsReducer } from "../reducers";

const Board = () => {
  const initialState = {
    lists: [],
    status: "idle",
  };
  const [listsState, listsDispatch] = useReducer(listsReducer, initialState);

  const { lists, status } = listsState;

  const { id } = useParams();
  const boardID = id;
  const history = useHistory();

  const [board, setBoard] = useState({});

  useEffect(() => {
    const fetchLists = async () => {
      try {
        listsDispatch({ type: ACTION_TYPES.GET_LISTS });

        const listData = await API.graphql({
          query: listLists,
          variables: { filter: { boardID: { eq: boardID } } },
        });
        const lists = listData.data.listLists.items;
        listsDispatch({ type: ACTION_TYPES.GET_LISTS_SUCCESS, value: lists });
      } catch (err) {
        console.log("error fetching lists");
        notificationError(err);
        listsDispatch({ type: ACTION_TYPES.GET_LISTS_ERROR });
      }
    };

    // check if board exists, then routes to a 404
    const fetchBoard = async () => {
      const board = await API.graphql(
        graphqlOperation(getBoard, { id: boardID })
      );
      setBoard(board);
      listsDispatch({ type: ACTION_TYPES.GET_FILTERED_LISTS, value: boardID });
      if (!board.data.getBoard) {
        history.push("/NotFound");
      }
    };
    fetchBoard();
    fetchLists();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
  };
  return (
    <>
      {status === "loading" ? (
        <h1 className="text-6xl">Loading Board...</h1>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="p-10 mx-auto container">
            <div className="text-2xl font-medium my-5">
              <h1>{board?.data?.getBoard.name}</h1>
            </div>
            {lists.length === 0 ? (
              <h1>You don't have any lists, start by creating one</h1>
            ) : null}
            <Droppable
              droppableId={boardID}
              type="COLUMN"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  className="py-10 flex items-start w-full"
                  ref={provided.innerRef}
                >
                  {lists.map((list, index) => {
                    return (
                      <List
                        index={index}
                        key={list.id}
                        listsDispatch={listsDispatch}
                        title={list.title}
                        listId={list.id}
                        cards={list.cards?.items}
                      />
                    );
                  })}
                  {provided.placeholder}
                  <CreateList
                    boardID={boardID}
                    lists={lists}
                    listsDispatch={listsDispatch}
                  />
                </div>
              )}
            </Droppable>

            <DeleteBoard boardID={boardID} />
          </div>
        </DragDropContext>
      )}
    </>
  );
};

export default Board;
