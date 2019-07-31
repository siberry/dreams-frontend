const defaultState = {
  currentUser: null,
  interpretations: [],
  loading: true,
  activeItem: "",
  selectedLetter: "A",
  selectedTerm: undefined,
  dreams: [],
  users: [],
  backendUrl: "https://thawing-scrubland-61961.herokuapp.com/https://majestic-canyonlands-27127.herokuapp.com/"
    //"http://localhost:3000/"

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
    case "SET_SELECTED_LETTER":
      return {...state, selectedLetter: action.payload}
    case "ADD_USERS":
      return {...state, users: action.payload}
    default:
      return state
  }
}

export default reducer
