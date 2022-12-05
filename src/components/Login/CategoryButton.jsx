import React,{useState} from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../supabaseClient";

const CategoryButton = () => {
  const { user } = useSelector((state) => state);
  const [status, setStatus] = useState(true)
  
  const onBoarding = async (id) => {
    const { data, error } = await supabase
      .from("User")
      .update({ isFirstTimeUser: false })
      .match({ id }).select()
    console.log("data", data);
    if (error) {
      console.log(error)
    }
  };

  const clickHandler = () => {
    //set user status to false
    console.log("clicked");
    onBoarding(10);
    console.log("afterclick");
  };  

  return (
    <button
      className="m-2 h-12 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-500 via-sky-300 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
      onClick={clickHandler}
    >
      LET'S VIBE
    </button>
  );
};

export default CategoryButton;
