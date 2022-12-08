const GET_GENRE = "GET_GENRE";

const _getGenre = (genre) => ({
  type: GET_GENRE,
  genre,
});

export const getGenre = (genre) => {
  return async (dispatch) => {
    dispatch(_getGenre(genre));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_GENRE:
      return action.genre;
    default:
      return state;
  }
};
