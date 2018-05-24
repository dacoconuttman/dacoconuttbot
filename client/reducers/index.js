import {
  SPOTIFY_TOKENS, SPOTIFY_ME_BEGIN, SPOTIFY_ME_SUCCESS, SPOTIFY_ME_FAILURE,
  SPOTIFY_GET_DEVICES_BEGIN, SPOTIFY_GET_DEVICES_SUCCESS, SPOTIFY_GET_DEVICES_ERROR,
  SPOTIFY_SET_DEVICE_BEGIN, SPOTIFY_SET_DEVICE_SUCCESS, SPOTIFY_SET_DEVICE_ERROR
} from '../actions/actions';

/** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  },
  devices: {
    list: [],
    currentId: null,
    loading: false,
  },
};

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case SPOTIFY_TOKENS:
    const {accessToken, refreshToken} = action;
    return {...state, accessToken, refreshToken};

  // set our loading property when the loading begins
  case SPOTIFY_ME_BEGIN:
    return {...state, user: {...state.user, loading: true}};

  // when we get the data merge it in
  case SPOTIFY_ME_SUCCESS:
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, action.data, {loading: false})
    }); // TODO: refactor with spread operator

  // currently no failure state :(
  case SPOTIFY_ME_FAILURE:
    return state;


  case SPOTIFY_GET_DEVICES_BEGIN:
    return {...state, devices: {...state.devices, loading: true}};

  case SPOTIFY_GET_DEVICES_SUCCESS:
    return {...state, devices: {...state.devices, loading: false, list: action.data.devices}};

  case SPOTIFY_GET_DEVICES_ERROR:
    return state; // TODO: error states

  
  case SPOTIFY_SET_DEVICE_BEGIN:
    return {...state, devices: {...state.devices, loading: true}};

  case SPOTIFY_SET_DEVICE_SUCCESS:
    return {...state, devices: {...state.devices, loading: false, currentId: action.data}};

  case SPOTIFY_SET_DEVICE_ERROR:
    return state;


  default:
    return state;
  }
}
