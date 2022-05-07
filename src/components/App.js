import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../GlobalStyle";
import Login from "./Login";
import UserProvider from "../contexts/userContext";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}