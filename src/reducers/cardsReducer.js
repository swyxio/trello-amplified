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

    case ACTION_TYPES.MOVE_CARD: {
      const {
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId,
      } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    }

    default:
      return state;
  }
};

export default cardsReducer;
