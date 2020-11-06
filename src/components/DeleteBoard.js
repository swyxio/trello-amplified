import React from "react";
import { DataStore } from '@aws-amplify/datastore'
import { Board } from '../models'
import { useHistory } from "react-router-dom";
// import { notificationError } from "../utils";
import { confirmAlert } from "react-confirm-alert";

const DeleteBoard = ({ boardID }) => {
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
    const todelete = await DataStore.query(Board, boardID);
    DataStore.delete(todelete); // or directly pass in instance
    history.push("/boards");
  };

  return (
    <button className="btn bg-red-600" onClick={() => handleDelete()}>
      Delete Board
    </button>
  );
};

export default DeleteBoard;
