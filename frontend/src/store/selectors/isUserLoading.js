import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isUserLoading = selector({
  key: "isUserLoading", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const user = get(userState);

    return user.isLoading;
  },
});
