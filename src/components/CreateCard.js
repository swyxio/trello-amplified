import React, { useState } from "react";
import { createCard } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { notificationError } from "../utils";
import { ACTION_TYPES } from "../actions";

const CreateCard = ({ listId, cardsDispatch }) => {
  const cardInitialState = { content: "" };

  const [cardFormState, setCardFormState] = useState(cardInitialState);
  const setInput = (key, value) => {
    setCardFormState({ ...cardFormState, [key]: value });
  };

  const addCard = async (e) => {
    e.preventDefault();
    try {
      if (!cardFormState.content) return;
      const cardData = { content: cardFormState.content, listID: listId };
      const card = await API.graphql(
        graphqlOperation(createCard, { input: cardData })
      );
      cardsDispatch({
        type: ACTION_TYPES.ADD_CARD,
        value: card.data.createCard,
      });
      setCardFormState(cardInitialState);
    } catch (err) {
      console.log("error creating card:", err);
      notificationError("Error creating card");
      cardsDispatch({
        type: ACTION_TYPES.ADD_CARD_ERROR,
        status: "error",
      });
    }
  };

  return (
    <form onSubmit={addCard}>
      <input
        className="form-input"
        onChange={(event) => setInput("content", event.target.value)}
        value={cardFormState.content}
        placeholder="Create new card"
      />
    </form>
  );
};

export default CreateCard;
