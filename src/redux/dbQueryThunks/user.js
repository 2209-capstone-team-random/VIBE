import { supabase } from "../../supabaseClient";
//ACTION TYPE
const GET_USER = 'GET_USER'
//ACTION CREATOR
const _getUser = (user) => ({
  type: GET_USER,
  user
})
//THUNK
export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      let { data: User, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", userId)
      dispatch(_getUser(User))
    } catch (error) {
      console.log(error);
    }
  }
};
//REDUCER
export default (state={},action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return state;
  }
}