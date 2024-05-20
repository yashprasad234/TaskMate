import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import Appbar from "./components/Appbar";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Today from "./pages/Today";
import Inbox from "./pages/Inbox";
import Completed from "./pages/Completed";
import { userState } from "./store/atoms/user";
import { userEmailState } from "./store/selectors/userEmail";

const backendUrl = import.meta.env.VITE_API_URL;

function App() {
  return (
    <RecoilRoot>
      <App2 />
    </RecoilRoot>
  );
}

function App2() {
  const userEmail = useRecoilValue(userEmailState);

  return (
    <Router>
      <Appbar />
      <InitUser />
      <Routes>
        <Route path="/" element={userEmail ? <Today /> : <Landing />} />
        <Route path="/signin" element={userEmail ? <Today /> : <Signin />} />
        <Route path="/today" element={userEmail ? <Today /> : <Landing />} />
        <Route path="/inbox" element={userEmail ? <Inbox /> : <Landing />} />
        <Route
          path="/completed"
          element={userEmail ? <Completed /> : <Landing />}
        />
      </Routes>
    </Router>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    try {
      const res = await axios.get(`${backendUrl}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.user);

      if (res.data.user) {
        setUser({
          isLoading: false,
          username: res.data.user,
        });
      } else {
        setUser({
          isLoading: false,
          username: res.data.user,
        });
      }
    } catch (e) {
      console.error(e);
      setUser({
        isLoading: false,
        username: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
