import { Route, Routes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Home from "./Pages/Home";
import Sponsor from "./Pages/Sponsor";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
