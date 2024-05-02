import { selector } from "recoil";
import { userState } from "../atoms/user";

const userEmailState = selector({
  key: "userEmailState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const user = get(userState);

    return user.username;
  },
});
