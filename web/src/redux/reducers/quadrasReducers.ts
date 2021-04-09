import { CLEAR_QUADRA, GET_QUADRA, GET_QUADRAS } from "../types"

const initialState = {
  quadras: [],
  quadra: {}
}

interface actionProps {
  type: string
  payload: any
}

export interface QuadraProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  opening_hours: string;
  sports: string;
  tel: string;
  value: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
  accepted: boolean;
}

export default function quadrasReducer(state = initialState, action: actionProps) {

  switch (action.type) {
    case GET_QUADRAS:
      return { ...state, quadras: action.payload }

    case GET_QUADRA:
      return { ...state, quadra: action.payload }

    case CLEAR_QUADRA:
      return { ...state, quadra: {} }

    default:
      return state
  }
}