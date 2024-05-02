import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user.js";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";

const backendUrl = import.meta.env.VITE_API_URL;

function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return <></>;
  }

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          padding: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: `'Tektur', sans-serif`,
            fontSize: "3rem",
            fontWeight: "900",
            letterSpacing: "0.8rem",
          }}
        >
          TODO
        </div>
        <div>
          <Button
            fullWidth={true}
            size="large"
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              setUser({
                isLoading: false,
                user: null,
              });
              navigate("/signin");
            }}
          >
            Signout
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          padding: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: `'Tektur', sans-serif`,
            fontSize: "3rem",
            fontWeight: "900",
            letterSpacing: "0.8rem",
          }}
        >
          TODO
        </div>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            fullWidth={true}
            size="large"
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Signup
          </Button>
          <Button
            fullWidth={true}
            size="large"
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </Button>
        </div>
      </div>
    );
  }
}

export default Appbar;
