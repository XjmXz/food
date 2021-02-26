
export default function city(state = "宣城", action:any) {
  switch (action.type) {
    case "CHOOSECITY":
      return action.city;
    default:
      return state;
  }
}
