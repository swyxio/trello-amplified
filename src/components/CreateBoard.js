import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createBoard } from "../graphql/mutations";
import { ACTION_TYPES } from "../actions";
import Modal from "react-modal";

Modal.setAppElement("#create-board");

const CreateBoard = ({ dispatch }) => {
  const initialState = "";
  const [newBoardTitle, setNewBoardTitle] = useState(initialState);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleChange = (e) => setNewBoardTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const boardName = { name: newBoardTitle };
      setNewBoardTitle(initialState);
      const newBoard = await API.graphql(
        graphqlOperation(createBoard, { input: boardName })
      );
      dispatch({
        type: ACTION_TYPES.ADD_BOARD,
        value: newBoard.data.createBoard,
      });
      closeModal();
    } catch (err) {
      console.log("error creating board:", err);
    }
  };
  return (
    <div>
      <Modal
        className="mx-auto mt-64  bg-white rounded-lg w-1/2 max-w-md p-5 shadow-lg"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Board Modal"
      >
        <div className="text-gray-900 font-medium text-lg">
          Create a new board
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col my-5">
          <input
            className="form-input mb-5"
            placeholder="Enter Board Name"
            onChange={handleChange}
            value={newBoardTitle}
            type="text"
          />
          <button className="ml-auto btn" type="submit">
            Create
          </button>
        </form>
      </Modal>
      <button className="btn" onClick={openModal}>
        Create Board
      </button>
    </div>
  );
};

export default CreateBoard;
