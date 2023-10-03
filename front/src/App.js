import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NICValidation from "./pages/NICValidation";
import Analytics from "./pages/Analytics";
import User from "./pages/UserProfile";
import Records from "./pages/Records";
import ForgotPassword from "./components/ForgotPassword";
import { RequireAuth } from "react-auth-kit";

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RequireAuth loginPath="/login"><Layout /></RequireAuth>}>
            <Route path="/" element={<Home />} exact />
            <Route path="/Records" element={<Records />} exact />
            <Route path="/Analytics" element={<Analytics />} exact />
            <Route path="/UserProfile" element={<User />} exact />
            <Route path="/NICValidation" element={<NICValidation />} exact />
          </Route>
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/forgotPassword" element={<ForgotPassword />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
