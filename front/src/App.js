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
import Analytics from "./pages/Analyze";
import Validation from "./pages/UserProfile";
import User from "./pages/User";
import Records from "./pages/Records";
// import { RequireAuth } from "react-auth-kit";

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
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} exact />
            <Route path="/Records" element={<Records />} exact />
            <Route path="/Analytics" element={<Analytics />} exact />
            <Route path="/Validation" element={<Validation />} exact />
            <Route path="/User" element={<User />} exact />
            <Route path="/NICValidation" element={<NICValidation />} exact />
          </Route>
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
