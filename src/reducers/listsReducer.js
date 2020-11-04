import { ACTION_TYPES } from "../actions";

const listsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_LISTS:
      return { ...state, status: "loading" };

    case ACTION_TYPES.GET_LISTS_SUCCESS:
      const lists = action.value;
      return { ...state, lists, status: "success" };

    case ACTION_TYPES.GET_LISTS_ERROR:
      return { ...state, status: "error" };

    case ACTION_TYPES.ADD_LIST:
      const newList = action.value;
      state.lists.push(newList);
      return { ...state };

    case ACTION_TYPES.DELETE_LIST:
      return { ...state, status: "deleting" };

    case ACTION_TYPES.DELETE_LIST_SUCCESS:
      const listID = action.value;
      const filteredLists = state.lists.filter((obj) => obj.id !== listID);
      state.lists = filteredLists;
      return { ...state, status: "successfully deleted" };

    case ACTION_TYPES.DELETE_LIST_ERROR:
      return { ...state, status: "error" };

    case ACTION_TYPES.MOVE_LIST: {
      const { oldListIndex, newListIndex } = action.value;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return {
        ...state,
        lists: newLists,
      };
    }
    default:
      return state;
  }
};

export default listsReducer;
