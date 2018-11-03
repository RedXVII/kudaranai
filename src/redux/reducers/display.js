import TOGGLE_DISPLAY from "../actionTypes"

const initialState = {
  contracted: false,
  hair: true,
  tan: false,
  rakugaki: false,
  clothes: true,
  text: true,
  special: false
};

export default function (state = initialState, action) {

  switch (action.type) {
    case TOGGLE_DISPLAY:
      const {property} = action.payload;

      var copy = Object.assign({}, state);
      copy[property] = !copy[property];
      return copy;
    default:

  }

  return state;
}
