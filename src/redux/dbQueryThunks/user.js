import { supabase } from "../../supabaseClient";

//ACTION TYPE
const GET_USER = "GET_USER";
//ACTION CREATOR
const GET_COUNT = "GET_COUNT";

const _getUser = (user) => ({
  type: GET_USER,
  user,
});

const _getCount = (count) => ({
  type: GET_COUNT,
  count,
});
//THUNK
export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      let { data: user, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", userId);
      dispatch(_getUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCount = (count) => {
  return async (dispatch) => {
    dispatch(_getCount(count));
  };
};

//REDUCER
export default (state = null, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case GET_COUNT:
      return action.count;
    default:
      return state;
  }
};
