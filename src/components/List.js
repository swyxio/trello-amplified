import React, { useState, useRef, 
  // useReducer
 } from "react";
import { useOnClickOutside } from "../hooks";
// import { notificationError } from "../utils";
import { CreateCard, Card } from "../components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DataStore } from '@aws-amplify/datastore'
import { List as ListModel } from '../models'

const List = ({ title, listId, cards, index }) => {
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowOptions(false));

  const removeList = async (listId) => {
    const todelete = await DataStore.query(ListModel, listId);
    DataStore.delete(todelete); // or directly pass in instance
  };
  console.log({cards})

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
                  {cards && cards.map(({ id, content }, index) => {
                    return (
                      <Card
                        key={id}
                        index={index}
                        cardId={id}
                        content={content}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <CreateCard
              listId={listId}
              cards={cards}
            />
            {provided.placeholder}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
