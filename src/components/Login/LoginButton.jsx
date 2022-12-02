import React from 'react'
import AUTH_URL from "../../auth/Auth_Url";
const LoginButton = () => {
  return (
    <div className="p-7">
          <a href={AUTH_URL}>
            <button className="m-2 h-12 px-5 text-lg border-hidden  text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-500 via-sky-300 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
              Login with Spotify
            </button>
          </a>
        </div>
  )
}

export default LoginButton