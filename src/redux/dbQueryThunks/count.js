const GET_COUNT = "GET_COUNT";

const _getCount = (count) => ({
  type: GET_COUNT,
  count,
});

export const getCount = (count) => {
  return async (dispatch) => {
    dispatch(_getCount(count));
  };
};

export default (state = 0, action) => {
  switch (action.type) {
    case GET_COUNT:
      return action.count;
    default:
      return state;
  }
};
