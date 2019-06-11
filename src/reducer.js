const defaultState = {
  currentUser: null,
  interpretations: [],
  loading: true,
  activeItem: "",
  selectedLetter: "A",
  selectedTerm: undefined
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_INTERPRETATIONS":
      return {...state, interpretations: action.payload}
    case "SET_SELECTED_TERM":
      console.log(action.payload)
      return {...state, selectedTerm: action.payload}
    default:
      return state
  }
}

export default reducer
