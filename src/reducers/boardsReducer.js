import { ACTION_TYPES } from "../actions";

const boardsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_BOARDS:
      return { ...state, status: "loading" };

    case ACTION_TYPES.GET_BOARDS_SUCCESS:
      const boards = action.value;
      return { ...state, boards, status: "success" };

    case ACTION_TYPES.GET_BOARDS_ERROR:
      return { ...state, status: "error" };

    case ACTION_TYPES.ADD_BOARD:
      const newBoard = action.value;
      state.boards.push(newBoard);
      return { ...state };

    case ACTION_TYPES.DELETE_BOARD:
      const boardID = action.value;
      const filteredBoards = state.boards.filter((obj) => obj.id !== boardID);
      state.boards = filteredBoards;
      return { ...state };

    default:
      return state;
  }
};

export default boardsReducer;
