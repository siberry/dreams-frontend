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
      return {...state, activeItem: action.payload}
    case "SET_CURRENT_USER":
      const token = action.payload.token || state.token
      localStorage.setItem("token", token)
      return {...state, currentUser: action.payload.user}
    case "CHANGE_LOAD_STATUS":
      return {...state, loading: false}
    default:
      return state
  }
}

export default reducer
