import "./App.css";

import Dashboard from "./pages/Dashboard";
import Bookshelf from "./pages/Bookshelf";
import People from "./pages/people";
import Login from "./pages/Login";
import Error from "./pages/error";
import notAuth from "./pages/notAuth";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./componets/Layout";
import Landing from "./pages/Landing";

import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Error />} />
          </>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/people" element={<People />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="*" element={<Error />} />
          </Route>
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
