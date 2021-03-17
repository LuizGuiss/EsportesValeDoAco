import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './reducers/usersReducer'
import quadrasReducer, { QuadraProps } from './reducers/quadrasReducers'

const middleware = [thunk]

const initialState = {}

export interface stateProps {
  user: {
    credentials: {
      id: string,
      email: string,
      name: string,
    },
    authenticated: boolean,
    error: string
  },
  quadras: {
    quadra: QuadraProps,
    quadras: Array<QuadraProps>
  }
}

const reducers = combineReducers({
  user: usersReducer,
  quadras: quadrasReducer,
})

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware))
)

export default store