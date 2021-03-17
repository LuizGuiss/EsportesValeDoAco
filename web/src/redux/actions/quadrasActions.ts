import api from "../../services/api"
import { QuadraProps } from "../reducers/quadrasReducers";
import { GET_QUADRA, GET_QUADRAS } from "../types";

export const getQuadras = (acceptedQuadras: boolean) => (dispatch: Function) => {

  api.get(`/quadras/${acceptedQuadras}`)
    .then((res) => {
      dispatch({ type: GET_QUADRAS, payload: res.data });
    })

}

export const getQuadra = (id: string) => (dispatch: Function) => {

  api.get(`/quadra/${id}`)
    .then((res) => {
      dispatch({ type: GET_QUADRA, payload: res.data });
    })

}

export const createQuadra = (quadraData: FormData, push: Function) => (dispatch: Function) => {

  api.post('/quadras', quadraData)
    .then(() => {
      alert("quadra created successfully");
      push('/app')
      dispatch(getQuadras(true))
    })
    .catch((err) => {
      alert("something went wrong");
    })
}

export const quadraPendingResponse = (id: string, adminResponse: boolean, push: Function) => (dispatch: Function) => {

  api.post(`/quadras/accept-response/${id}`, { adminResponse })
    .then(() => {
      dispatch(getQuadras(true))
      push('/dashboard/quadras-registered')
    })
}

export const deleteQuadra = (id: string, push: Function) => (dispatch: Function) => {
  api.delete(`/quadra/${id}`)
    .then(() => {
      dispatch(getQuadras(true))
      alert("Quadra deletada com sucesso!!")
      push('/dashboard/quadras-registered')
    })
}

export const updateQuadra = (id: string, data: FormData, push: Function) => (dispatch: Function) => {
  api.put(`/quadra/${id}`, data)
    .then(() => {
      dispatch(getQuadras(true))
      alert("Quadra atualizada com sucesso!")
      push('/dashboard/quadras-registered')
    })
}
