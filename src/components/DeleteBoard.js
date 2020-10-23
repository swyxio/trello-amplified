import React, { useContext } from "react";
import BoardsContext from "../contexts/BoardsContext";
import { API, graphqlOperation } from "aws-amplify";
import { ACTION_TYPES } from "../actions";
import { deleteBoard } from "../graphql/mutations";
import { useHistory } from "react-router-dom";
import { notificationError } from "../utils";

const DeleteBoard = ({ boardID }) => {
  const { boardsDispatch } = useContext(BoardsContext);
  const history = useHistory();

  const removeBoard = async () => {
    try {
      await API.graphql(
        graphqlOperation(deleteBoard, { input: { id: boardID } })
      );
      boardsDispatch({ type: ACTION_TYPES.DELETE_BOARD, value: boardID });
      history.push("/boards");
    } catch (err) {
      console.log("error deleting board:", err);
      notificationError("Error deleting board");
    }
  };
  return (
    <button className="btn bg-red-500" onClick={removeBoard}>
      Delete Board
    </button>
  );
};

export default DeleteBoard;
