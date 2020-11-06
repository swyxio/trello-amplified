import React, { useState } from "react";
// import { notificationError } from "../utils";
import { DataStore } from '@aws-amplify/datastore'
import { Card } from '../models'


const CreateCard = ({ listId }) => {
  const cardInitialState = { content: "" };

  const [cardFormState, setCardFormState] = useState(cardInitialState);
  const setInput = (key, value) => {
    setCardFormState({ ...cardFormState, [key]: value });
  };

  const addCard = async (e) => {
    e.preventDefault();
    if (!cardFormState.content) return;

    await DataStore.save(new Card({
      content: cardFormState.content,
      listID: listId,
    }))
    setCardFormState(cardInitialState)
  };

  return (
    <form onSubmit={addCard}>
      <input
        className="form-input"
        onChange={(event) => setInput("content", event.target.value)}
        value={cardFormState.content}
        placeholder="Create Card +"
      />
    </form>
  );
};

export default CreateCard;
