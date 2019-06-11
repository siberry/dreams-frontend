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
      return {...state, selectedTerm: action.payload}
    case "SET_ACTIVE_ITEM":
      console.log(action.payload)
      return {...state, activeItem: action.payload}
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    default:
      return state
  }
}

export default reducer
