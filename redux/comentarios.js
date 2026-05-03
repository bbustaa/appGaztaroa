import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { isLoading: true, errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, isLoading: false, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_LOADING:
      return { ...state, isLoading: true, errMess: null, comentarios: [] };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      const nuevoComentario = {
        ...action.payload,
        id: state.comentarios.length
      };
      return { ...state, comentarios: state.comentarios.concat(nuevoComentario) };

    default:
      return state;
  }
};