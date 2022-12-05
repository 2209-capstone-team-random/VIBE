import { supabase } from "../../supabaseClient";
//TESTED DB FETCH ID
//done with vibe
//adding a vibe, mutual still false

//get User from DB
export const getUser = async (id) => {
  try {
    let { data: User, error } = (await supabase
      .from("User")
      .select("*")
      .eq("id")
    )
      // (User.isFirstTimeUser)
      // ? history.push("/onboarding")
      // : User;
  } catch (error) {
    console.log(error);
  }
};

export const vibe = async (friendId,userId) => {
  try {
    const { data, error } = await supabase
      .from("Vibe")
      .insert([{ friendId, userId }]);
  } catch (error) {
    console.log(error);
  }
};

//delete a vibe && setMutual false
export const deleteVibe = async (userId, friendId) => {
  try {
    const { data, error } = await supabase
      .from("Vibe")
      .delete()
      //shorthand - userId : userId, friendId: friendId  
      .match({ userId, friendId });
    let { data: deleteMutual } = await supabase
      .from("Vibe")
      .update({ mutual: "false" })
      .match({ userId: friendId, friendId: userId });
  } catch (error) {
    console.log(error);
  }
};

// fetching user's friends
export const getFriend = async (userId) => {
  try {
    let { data: friends, error } = await supabase
      .from("Vibe")
      .select("friendId")
      .eq("userId", userId);
    console.log("before map", friends);

    let users = await Promise.all(
      friends.map((friend) =>
        supabase.from("User").select("*").eq("id", friend.friendId)
      )
    );
    console.log("after map", users[0].data);
  } catch (error) {
    console.log(error);
  }
};

//add categories upon 1st time User's pick
export const addCategories = async (userId, catA, catB, catC) => {
  try {
    let { data: user, error } = await supabase
      .from("User_Top_Cat")
      .insert([{ userId, catA, catB, catC }]);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

// const addCategories =async ()=>{
//   try {
//     let { data: users, error } = await supabase
// .from('User_Top_Cat')
// .select('*')
// console.log(users)
// let filteredUsers = users.filter(user=>user.favCats.includes('pop'))
// console.log(filteredUsers)
//   } catch (error) {
//     console.log(error)
//   }
// }

//checkMutual
//ex. check before writing on wall
export const checkMutual = async () => {
  try {
    //find status of one user's mutual, if one is true assume the other is also true. in this case checking userid 6
    let { data: user } = await supabase
      .from("Vibe")
      .select("mutual")
      .match({ userId: 6, friendId: 10 });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

//change status to true on both user rows
export const setMutual = async (userId,friendId) => {
  //update mutual status of one user, if one is false, will need to update the other one
  try {
    let { data: setMutualA } = await supabase
      .from("Vibe")
      .update({ mutual: "true" })
      .match({ userId: 6, friendId: 10 });
    console.log(setMutualA);
    let { data: setMutualB } = await supabase
      .from("Vibe")
      .update({ mutual: "true" })
      .match({ userId: 10, friendId: 6 });
    console.log(setMutualB);
  } catch (error) {
    console.log(error);
  }
};

//Jerry goes to Le's page they are strangers, useEffect runs SELECT on Vibe table JerryUser and LeFriend check if row exists,
//if return null, you did not vibe yet, so vibe button is "VIBE".
//Jerry clicks on vibe,  it will run the vibe function to add the row with jerry USER le Friend.
//check relationship exist in the opposite, where Le user Jerry friend. if returns a row, then run setMutual on both side.
//with Le's Userid check Jerry Friendid,if returns null = then dont do anything.

//if returns a row,button will show "VIBED" check mutual value.
//if mutual=true, allow write on wall. else cannot write on wall

//two days, Le goes on Jerrys page after jerry already vibed, useEffects run checkmutual(), which still return false at this point. Le clicks on vibe, whichs runs the vibe function to add row Le User Jerry Friend. where Jerry user Le friend. if both rows exist, run setMutual.

//WALL POSTS
//(posterId)userID_ONE writes on (userId)userID_TWO's wall.
export const postOnWall = async (userId,posterId) => {
  try {
    const { data: wallpost, error } = await supabase.from("Wall_Post").insert([
      {
        userId: 6,
        posterId: 10,
        date: new Date().toLocaleDateString(),
        body: "abc",
      },
    ]);
    console.log("wallpost", wallpost);
  } catch (error) {
    console.log(error);
  }
};

//GET WALL POSTS
export const getWallPost = async (userId) => {
  try {
    const { data: wallpost, error } = await supabase
      .from("Wall_Post")
      .select("body")
      .eq("userId", 6);
    console.log(wallpost);
  } catch (error) {
    console.log(error);
  }
};

//GET POSTER POSTING THE WALL POST
// -----T O D O  NOT TESTED YET----------
export const getPoster = async (userId) => {
  try {
    const { data: poster, error } = await supabase
      .from("Wall_Post")
      .select("posterId")
      .eq("userId", 10);
    console.log(poster);
  } catch (error) {
    console.log(error);
  }
};

// adding user into db, insert

export const insertUser = async (url, spotifyId, display_name) => {
  try {
    const { data, error } = await supabase
      .from("User")
      .insert([{ url, spotifyId, display_name }]);
  } catch (error) {
    console.log(error);
  }
};

//after submit top cat, genre, onsubmit will trigger this setFirsttimeuser to false
//Need testing
export const onBoarding = async (userId) => {
  try {
    const { data:status, error } = await supabase
      .from('User')
      .update('isFirstTimeUser',false)
      .eq("userId", userId)
  } catch (error) {
    console.log(error)
  }
}



