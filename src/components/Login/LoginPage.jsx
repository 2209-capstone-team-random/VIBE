import React from "react";
import Landing from "./Landing";
import FirstLogin from "./FirstLogin";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

const LoginPage = () => {
  const [isFirstTime,setIsFirstTime] = useState('false')
  return(
      <FirstLogin/>
  );
};

export default LoginPage;
