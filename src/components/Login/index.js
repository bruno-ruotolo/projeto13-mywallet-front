import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import { Rings } from "react-loader-spinner"

import { UserContext } from "../../contexts/userContext";

import { LoginSection } from "./style"

export default function Login() {
  const navigate = useNavigate();

  const userTokenStorage = localStorage.getItem("token");
  const userNameStorage = localStorage.getItem("name");

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [inputsStatus, setInputsStatus] = useState(false);

  const { setUserInfos } = useContext(UserContext);

  useEffect(() => {
    if (userTokenStorage && userNameStorage) {
      navigate("/home");
    }
  }, [navigate, userTokenStorage, userNameStorage])

  function handleInputs(e, property) {
    setUserLogin({ ...userLogin, [property]: e.target.value })
  }

  function sendData(e) {
    e.preventDefault();
    setInputsStatus(true);

    const URL = "https://projeto13-mywallet-back-bruno.herokuapp.com/sign-in"
    const promise = axios.post(URL, userLogin);
    promise.then((response) => {
      const { data } = response;
      setUserInfos(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      setInputsStatus(false);
      navigate("/home");
    });

    promise.catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e.response.data,
        text: 'Verifique seus dados e tente novamente',
        width: 326
      });
      setInputsStatus(false);
    });
  }

  return (
    <LoginSection>
      <h1>MyWallet</h1>
      <form onSubmit={sendData}>
        <input
          type="email"
          placeholder="E-mail"
          value={userLogin.email}
          onChange={(e) => handleInputs(e, "email")}
          required
          disabled={inputsStatus}
        />

        <input
          type="password"
          placeholder="Senha"
          value={userLogin.password}
          onChange={(e) => handleInputs(e, "password")}
          autoComplete="on"
          required
          disabled={inputsStatus} />
        <button disabled={inputsStatus}>{!inputsStatus ? "Entrar" : <Rings color="#ffffff" />}</button>
      </form>
      <p onClick={() => navigate("/sign-up")}>Primeira vez? Cadastre-se!</p>
    </LoginSection>
  )
}