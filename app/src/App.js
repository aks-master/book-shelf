import "./App.css";

import Dashboard from "./pages/Dashboard";
import Bookshelf from "./pages/Bookshelf";
import Login from "./pages/Login";
import Error from "./pages/error";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./componets/Layout";
import Landing from "./pages/Landing";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {true ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Bookshelf" element={<Bookshelf />} />
              <Route path="*" element={<Error />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
