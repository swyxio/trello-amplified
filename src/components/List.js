import React, { useState, useRef, useReducer } from "react";
import { useOnClickOutside } from "../hooks";
import { deleteList } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { notificationError } from "../utils";
import { CreateCard, Card } from "../components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ACTION_TYPES } from "../actions";
import { cardsReducer } from "../reducers";

const List = ({ title, listsDispatch, listId, cards, index }) => {
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
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative flex flex-col mr-3"
        >
          <div className="flex justify-between mb-5 pr-5">
            <h1 className="text-xl font-medium">{title}</h1>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="relative z-10"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-8 w-48 bg-gray-700 rounded-md shadow-xl z-20">
                <button
                  ref={ref}
                  onClick={() => removeList(listId)}
                  className="w-full text-left px-4 py-2 text-sm text-white rounded-md  hover:bg-gray-600 "
                >
                  Delete List
                </button>
              </div>
            )}
          </div>
          <div className="h-auto bg-gray-800 p-3 rounded shadow mr-5  max-w-xl">
            <Droppable droppableId={listId} type="CARD">
              {(provided) => (
                <div ref={provided.innerRef}>
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <CreateCard
              listId={listId}
              cardsDispatch={cardsDispatch}
              cards={cardsState}
            />
            {provided.placeholder}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;

// <div className="mt-8" ref={ref}>

//               </div>

// className="text-left px-4 py-2 text-sm text-gray-800 absolute right-0  w-48 bg-white hover:bg-gray-200 rounded-md overflow-hidden shadow-xl z-20"
