import React, { useState, useEffect, useReducer } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useParams, useHistory, Link } from "react-router-dom";
import { getBoard, listsByBoard } from "../graphql/queries";
import { notificationError } from "../utils";
import { List, DeleteBoard, CreateList, Loader } from "../components";
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

        const listData = await API.graphql(
          graphqlOperation(listsByBoard, { boardID: boardID })
        );
        const lists = listData.data.listsByBoard.items;
        listsDispatch({ type: ACTION_TYPES.GET_LISTS_SUCCESS, value: lists });
      } catch (err) {
        console.log(err);
        notificationError("error fetching lists");
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
    const { destination, source, type } = result;
    console.log(type);
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        listsDispatch({
          type: "MOVE_LIST",
          value: {
            oldListIndex: source.index,
            newListIndex: destination.index,
            boardId: source.droppableId,
          },
        });
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      // dispatch({
      //   type: "MOVE_CARD",
      //   value: {
      //     sourceListId: source.droppableId,
      //     destListId: destination.droppableId,
      //     oldCardIndex: source.index,
      //     newCardIndex: destination.index,
      //     boardID
      //   }
      // });
    }
  };
  return (
    <div className="bg-gray-900 text-white">
      {status === "loading" ? (
        <div className="h-screen w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="py-10 pl-10 md:px-24 mx-auto container h-screen">
            <h1 className="text-3xl font-medium my-5">
              <span>
                <Link className="" to="/boards">
                  Boards /
                </Link>{" "}
              </span>
              {board?.data?.getBoard.name}
            </h1>
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
                  className="py-10 flex items-start w-full overflow-y-scroll"
                  ref={provided.innerRef}
                >
                  {lists.map((list, index) => {
                    return (
                      <List
                        onDragEnd={onDragEnd}
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
    </div>
  );
};

export default Board;
