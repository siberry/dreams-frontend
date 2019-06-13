const defaultState = {
  currentUser: null,
  interpretations: [],
  loading: true,
  activeItem: "",
  selectedLetter: "A",
  selectedTerm: undefined,
  dreams: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_INTERPRETATIONS":
      return {...state, interpretations: action.payload}
    case "SET_SELECTED_TERM":
      return {...state, selectedTerm: action.payload}
    case "SET_ACTIVE_ITEM":
      return {...state, activeItem: action.payload}
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "CHANGE_LOAD_STATUS":
      return {...state, loading: action.payload}
    case "GET_DREAMS":
      return {...state, dreams: action.payload}
    default:
      return state
  }
}

export default reducer
