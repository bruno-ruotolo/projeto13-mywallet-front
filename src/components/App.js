import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../GlobalStyle";
import Login from "./Login";
import UserProvider from "../contexts/userContext";
import Register from "./Register";
import Home from "./Home/Home";
import NewEntry from "./NewEntry";
import NewExit from "./NewExit";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new-entry" element={<NewEntry />} />
          <Route path="/new-exit" element={<NewExit />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}