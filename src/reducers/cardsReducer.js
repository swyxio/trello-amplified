import { ACTION_TYPES } from "../actions";

const cardsReducer = (state, action) => {
  const cards = state;
  switch (action.type) {
    case ACTION_TYPES.ADD_CARD:
      const newCard = action.value;
      cards.push(newCard);
      return [...cards];

    case ACTION_TYPES.DELETE_CARD:
      const cardID = action.value;
      const filteredCards = cards.filter((card) => card.id !== cardID);
      state = filteredCards;
      return [...state];

    default:
      return state;
  }
};

export default cardsReducer;
