import React, { useContext } from "react";
import BoardsContext from "../contexts/BoardsContext";
import { API, graphqlOperation } from "aws-amplify";
import { ACTION_TYPES } from "../actions";
import { deleteBoard } from "../graphql/mutations";
import { useHistory } from "react-router-dom";
import { notificationError } from "../utils";
import { confirmAlert } from "react-confirm-alert";

const DeleteBoard = ({ boardID }) => {
  const { boardsDispatch } = useContext(BoardsContext);
  const history = useHistory();

  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="text-white bg-gray-900 p-10 rounded">
            <h1 className="text-2xl">Delete Board</h1>
            <p className="text-md my-5">
              Are you sure you want to delete this board? This action can't be
              undone!
            </p>
            <div className="flex justify-end">
              <button className="btn mr-5" onClick={onClose}>
                cancel
              </button>
              <button
                className="btn bg-red-600"
                onClick={() => removeBoard() && onClose()}
              >
                Delete
              </button>
            </div>
          </div>
        );
      },
    });
  };

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
    <button className="btn bg-red-600" onClick={() => handleDelete()}>
      Delete Board
    </button>
  );
};

export default DeleteBoard;
