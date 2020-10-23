import React, { useState, useRef, useReducer } from "react";
import { useOnClickOutside } from "../hooks";
import { deleteList } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { notificationError } from "../utils";
import { CreateCard, Card } from "../components";
import { Droppable } from "react-beautiful-dnd";
import { ACTION_TYPES } from "../actions";
import { cardsReducer } from "../reducers";

const List = ({ title, listsDispatch, listId, cards }) => {
  const [cardsState, cardsDispatch] = useReducer(cardsReducer, cards);

  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowOptions(false));

  const removeList = async (listId) => {
    try {
      listsDispatch({ type: ACTION_TYPES.DELETE_LIST });
      await API.graphql(
        graphqlOperation(deleteList, { input: { id: listId } })
      );
      listsDispatch({ type: ACTION_TYPES.DELETE_LIST_SUCCESS, value: listId });
    } catch (err) {
      console.log("error deleting list:", err);
      notificationError("Error deleting list");
    }
  };

  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="relative flex flex-col h-auto bg-gray-100 p-5 rounded shadow mr-5  max-w-xl"
        >
          <div className="flex justify-between mb-5">
            <h1 className="text-xl font-medium">{title}</h1>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="relative z-10 block bg-gray-800 rounded p-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showOptions && (
              <div class="absolute right-0 mt-8 w-48 bg-white rounded-md  shadow-xl z-20">
                <button
                  onClick={() => removeList(listId)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-800  hover:bg-gray-200 "
                >
                  Delete List
                </button>
              </div>
            )}
          </div>
          {cardsState.map(({ id, content }, index) => {
            return (
              <Card
                key={id}
                index={index}
                cardId={id}
                content={content}
                cardsDispatch={cardsDispatch}
              />
            );
          })}
          <CreateCard
            listId={listId}
            cardsDispatch={cardsDispatch}
            cards={cardsState}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default List;

// <div className="mt-8" ref={ref}>

//               </div>

// className="text-left px-4 py-2 text-sm text-gray-800 absolute right-0  w-48 bg-white hover:bg-gray-200 rounded-md overflow-hidden shadow-xl z-20"
