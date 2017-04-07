
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

const initialState = { x: 0, y: 0 }

const store = createStore( (state=initialState, action) => {

  const newState = { x: state.x, y: state.y }

  // do stuff to the state, using the action
  switch (action.type) {
    case 'MOVE_UP':
      newState.y = newState.y + 1
      break

    case 'MOVE_DOWN':
      newState.y = newState.y - 1
      break

    default:
      return state
  }

  return newState
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

setTimeout(() => store.dispatch({type: 'MOVE_UP'}), 1000)
setTimeout(() => store.dispatch({type: 'MOVE_UP'}), 2000)
setTimeout(() => store.dispatch({type: 'MOVE_UP'}), 3000)
setTimeout(() => store.dispatch({type: 'MOVE_UP'}), 4000)
setTimeout(() => store.dispatch({type: 'MOVE_UP'}), 5000)

store.subscribe(() => {
  ReactDOM.render(
    <div>
      <h1>{ store.getState().x }</h1>
      <h1>{ store.getState().y }</h1>
    </div>
  , document.getElementById('app'))
})








