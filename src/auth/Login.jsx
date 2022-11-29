// import React, { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
// import axios from "axios";

// export default function Login() {
//   const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
//   const CLIENT_ID = "f66d801286b24df78db5be66cb18b8e4";
//   const REDIRECT_URI = "http://localhost:5173/";
//   const RESPONSE_TYPE = "token";
//   const scope = `ugc-image-upload
//     user-modify-playback-state
//     user-read-playback-state
//     user-read-currently-playing
//     streaming
//     app-remote-control
//     user-library-modify
//     user-library-read
//     user-top-read
//     user-read-email
//     user-read-private
//     user-read-playback-position
//     user-read-recently-played
//     user-follow-read
//     user-follow-modify
//     playlist-read-private
//     playlist-read-collaborative
//     playlist-modify-public
//     playlist-modify-private`;

//   const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`;

//   const [token, setToken] = useState("");
//   const [myInfo, setMyInfo] = useState([]);

//   useEffect(() => {
//     const hash = window.location.hash;
//     let token = window.localStorage.getItem("token");

//     if (!token && hash) {
//       token = hash
//         .substring(1)
//         .split("&")
//         .find((elem) => elem.startsWith("access_token"))
//         .split("=")[1];

//       window.location.hash = "";
//       window.localStorage.setItem("token", token);
//     }
//     setToken(token);
//   }, []);

//   const me = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://api.spotify.com/v1/me/top/artists",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMyInfo(data.items);
//       console.log(data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <div>
//       <h1 className="flex justify-center items-center font-medium text-6xl">
//         Vibe
//       </h1>
//       {!token ? (
//         <a
//           className="flex justify-center items-center h-screen p-20"
//           href={AUTH_URL}
//         >
//           <button
//             className="bg-teal-500 hover:bg-teal-700 h-10 w-40 active:ring"
//             type="submit"
//             href={AUTH_URL}
//           >
//             Login
//           </button>
//         </a>
//       ) : (
//         <div>
//           <h1 className="flex justify-center items-center font-medium text-3xl">
//             Welcome
//           </h1>
//           <a className="flex justify-center items-center">
//             <button
//               className="bg-teal-500 hover:bg-teal-700 h-10 w-40 active:ring"
//               onClick={me}
//             >
//               Get My Info
//             </button>
//           </a>
//           <a className="flex justify-center items-center h-screen p-20">
//             <button
//               className="bg-teal-500 hover:bg-teal-700 h-10 w-40 active:ring"
//               onClick={logout}
//             >
//               Logout
//             </button>
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
