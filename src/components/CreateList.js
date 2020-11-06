import React, { useState } from "react";
import { DataStore } from '@aws-amplify/datastore'
import { List } from '../models'

const CreateList = ({ boardID }) => {
  const listInitialState = { title: "" };

  const [listFormState, setListFormState] = useState(listInitialState);
  const setInput = (key, value) => {
    setListFormState({ ...listFormState, [key]: value });
  };

  const addList = async (e) => {
    e.preventDefault();
    if (!listFormState.title) return;
    await DataStore.save(new List(
      { title: listFormState.title, boardID: boardID }
    ))
    setListFormState(listInitialState);
  };

  return (
    <form className="block " onSubmit={addList}>
      <input
        className="form-input"
        onChange={(event) => setInput("title", event.target.value)}
        value={listFormState.title}
        placeholder="Create List +"
      />
    </form>
  );
};

export default CreateList;
