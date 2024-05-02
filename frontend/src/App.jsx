import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import Appbar from "./components/Appbar";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Tasks from "./pages/Tasks";
import { userState } from "./store/atoms/user";
import { isUserLoading } from "./store/selectors/isUserLoading";
import { userEmailState } from "./store/selectors/userEmail";
import Task from "./components/Task";

const backendUrl = import.meta.VITE_API_URL;

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
        <Route path="/" element={userEmail ? <Tasks /> : <Landing />} />
        <Route path="/signin" element={userEmail ? <Tasks /> : <Signin />} />
        <Route path="/tasks" element={userEmail ? <Tasks /> : <Landing />} />
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
        username: res.data.user,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
