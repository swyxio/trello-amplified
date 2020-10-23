import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteCard } from "../graphql/mutations";
import { notificationError } from "../utils";
import { Draggable } from "react-beautiful-dnd";
import { ACTION_TYPES } from "../actions";

const Card = ({ content, cardId, index, cardsDispatch }) => {
  const removeCard = async (cardId) => {
    try {
      await API.graphql(
        graphqlOperation(deleteCard, { input: { id: cardId } })
      );
      cardsDispatch({ type: ACTION_TYPES.DELETE_CARD, value: cardId });
    } catch (err) {
      console.log("error deleting card:", err);
      notificationError("Error deleting card");
    }
  };

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex items-center justify-between shadow bg-white p-5 rounded mb-3 text-left"
        >
          <div className="text-lg">
            <p>{content}</p>
          </div>
          <div>
            <button className="mr-3" onClick={() => removeCard(cardId)}>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
