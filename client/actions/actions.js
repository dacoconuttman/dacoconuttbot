import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';

export const SPOTIFY_GET_DEVICES_BEGIN = 'SPOTIFY_GET_DEVICES_BEGIN';
export const SPOTIFY_GET_DEVICES_SUCCESS = 'SPOTIFY_GET_DEVICES_SUCCESS';
export const SPOTIFY_GET_DEVICES_ERROR = 'SPOTIFY_GET_DEVICES_ERROR';

export const SPOTIFY_SET_DEVICE_BEGIN = 'SPOTIFY_SET_DEVICE_BEGIN';
export const SPOTIFY_SET_DEVICE_SUCCESS = 'SPOTIFY_SET_DEVICE_SUCCESS';
export const SPOTIFY_SET_DEVICE_ERROR = 'SPOTIFY_SET_DEVICE_ERROR';

/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

/* get the user's info from the /me api */
export function getMyInfo() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(data => {
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}

export function getDevices() {
  return dispatch => {
    dispatch({ type: SPOTIFY_GET_DEVICES_BEGIN });
    spotifyApi.getMyDevices().then(data => {
      dispatch({ type: SPOTIFY_GET_DEVICES_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_GET_DEVICES_ERROR, error: e })
    });
  }
}

export function setDevice(deviceId) {
  return dispatch => {
    dispatch({ type: SPOTIFY_SET_DEVICE_BEGIN });
    spotifyApi.transferMyPlayback({ deviceIds: [deviceId], play: true }).then(data => {
      dispatch({ type: SPOTIFY_SET_DEVICE_SUCCESS, data: deviceId });
    }).catch(e => {
      dispatch({ type: SPOTIFY_SET_DEVICE_ERROR, error: e });
    });
  }
}