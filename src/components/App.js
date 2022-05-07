import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../GlobalStyle";
import Login from "./Login";
import UserProvider from "../contexts/userContext";
import Register from "./Register";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}