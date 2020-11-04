import React, { useState } from "react";
import { API } from "aws-amplify";
import { createList } from "../graphql/mutations";
import { notificationError } from "../utils";
import { ACTION_TYPES } from "../actions";

const CreateList = ({ boardID, listsDispatch }) => {
  const listInitialState = { title: "" };

  const [listFormState, setListFormState] = useState(listInitialState);
  const setInput = (key, value) => {
    setListFormState({ ...listFormState, [key]: value });
  };

  const addList = async (e) => {
    e.preventDefault();
    try {
      if (!listFormState.title) return;
      const listData = { title: listFormState.title, boardID: boardID };
      // const list = await API.graphql(
      //   graphqlOperation(createList, { input: listData, timestamp: Date.now() })
      // );
      const list = await API.graphql({
        query: createList,
        variables: {
          input: {
            title: listData.title,
            boardID: listData.boardID,
          },
        },
      });
      listsDispatch({
        type: ACTION_TYPES.ADD_LIST,
        value: list.data.createList,
      });
      setListFormState(listInitialState);
    } catch (err) {
      console.log("error creating list:", err);
      notificationError("Error creating list");
    }
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
