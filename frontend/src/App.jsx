import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
