const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const result = {
        ...state,
        good: state.good + 1
      }
      return result
    case 'OK':
      const result2 = {
        ...state,
        ok: state.ok + 1
      }
      return result2
    case 'BAD':
      return {
        ...state,
        bad: state.bad + 1
      }
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer
