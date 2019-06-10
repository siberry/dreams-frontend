const defaultState = {
  currentUser: null,
  interpretations: [],
  loading: true,
  activeItem: "",
  selectedLetter: "A",
  clickedTerm: undefined
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_INTERPRETATIONS":
      return {...state, interpretations: action.payload}
    default:
      return state
  }
}

export default reducer
