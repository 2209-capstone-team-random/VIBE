const clientInfo = {
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  CLIENT_ID: "f66d801286b24df78db5be66cb18b8e4",
  REDIRECT_URI: "http://localhost:5173/",
  RESPONSE_TYPE: "token",
  scope: `ugc-image-upload
    user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    streaming
    app-remote-control
    user-library-modify
    user-library-read
    user-top-read
    user-read-email
    user-read-private
    user-read-playback-position
    user-read-recently-played
    user-follow-read
    user-follow-modify
    playlist-read-private
    playlist-read-collaborative
    playlist-modify-public
    playlist-modify-private`,
};

const AUTH_URL = `${clientInfo.AUTH_ENDPOINT}?client_id=${clientInfo.CLIENT_ID}&redirect_uri=${clientInfo.REDIRECT_URI}&response_type=${clientInfo.RESPONSE_TYPE}&scope=${clientInfo.scope}`;

export default AUTH_URL;
