import axiosWithAuth from "../../../Helpers/axiosWithAuth";

// Authentication
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";

// Google Maps
export const UPDATE_PLACE = "UPDATE_PLACE";
export const UPDATE_MAP = "UPDATE_MAP";

// User Dashboard
export const UPDATE_SAVED_LOCATIONS = "UPDATE_SAVED_LOCATIONS";
export const REMOVE_SAVED_LOCATION = "REMOVE_SAVED_LOCATION";
export const UPDATE_USER_VISITS = "UPDATE_USER_VISITS";
export const REMOVE_USER_VISIT = "REMOVE_USER_VISIT";

// ACTIONS
// Authentication
export const login = (e, creds, history) => dispatch => {
  e.preventDefault();
  axiosWithAuth()
    .post("/auth/login", {
      email: creds.email,
      password: creds.password
    })
    .then(res => {
      if (res.data.id) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      }
    })
    .catch(err => console.error(err.message));
};

export const register = (e, creds, history) => dispatch => {
  e.preventDefault();
  axiosWithAuth()
    .post("/auth/user/register", {
      username: creds.username,
      firstName: creds.firstname,
      lastName: creds.lastname,
      email: creds.email,
      password: creds.password
    })
    .then(res => {
      if (res.data.id) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      }
    })
    .catch(err => console.error(err.message));
};

export const checkToken = () => dispatch => {
  axiosWithAuth()
    .get("/auth/info")
    .then(res => {
      if (res.status === 200)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      else {
      }
    })
    .catch(err => {
      localStorage.removeItem("token");
      console.error(err.message);
    });
};

export const signout = (e, history) => dispatch => {
  e.preventDefault();
  localStorage.removeItem("token");
  dispatch({ type: SIGN_OUT });
};

// Google Maps
export const updatePlace = place => dispatch => {
  dispatch({ type: UPDATE_PLACE, payload: place });
};

export const getSavedLocations = () => dispatch => {
  axiosWithAuth()
    .get("/locations/saved/")
    .then(res => {
      dispatch({ type: UPDATE_SAVED_LOCATIONS, payload: res.data });
    })
    .catch(err => console.error(err.message));
};

export const updateMap = map => ({
  type: UPDATE_MAP,
  payload: map
})

// User Dashboard
export const getUserVisits = () => dispatch => {
  axiosWithAuth()
    .get("/locations/visited/")
    .then(res => {
      dispatch({ type: UPDATE_USER_VISITS, payload: res.data });
    })
    .catch(err => console.error(err.message));
};

export const removeUserVisit = visitId => dispatch => {
  axiosWithAuth()
    .delete(`/locations/visited/${visitId}`)
    .then(res => {
      res.status === 204 &&
        dispatch({ type: REMOVE_USER_VISIT, payload: visitId });
    })
    .catch(err => console.error(err.message));
};

export const removeSavedLocation = locationId => dispatch => {
  axiosWithAuth()
    .delete(`/locations/saved/${locationId}`)
    .then(res => {
      res.status === 204 &&
        dispatch({ type: REMOVE_SAVED_LOCATION, payload: locationId });
    })
    .catch(err => console.error(err.message));
};
