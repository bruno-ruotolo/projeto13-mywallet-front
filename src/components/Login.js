import styled from "styled-components"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { UserContext } from "../contexts/userContext";

export default function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const { userData, setUserData } = useContext(UserContext);

  function handleInputs(e, property) {
    setUserLogin({ ...userLogin, [property]: e.target.value })
  }

  function sendData(e) {
    e.preventDefault();
    const URL = "http://localhost:5000/sign-in"
    const promise = axios.post(URL, userLogin);
    promise.then((response) => {
      const { data } = response;
      const token = data.token;
      setUserData(token);
      navigate("/home");
    });

    promise.catch((e) => {
      alert(e.response.data);
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
          required />

        <input
          type="password"
          placeholder="Senha"
          value={userLogin.password}
          onChange={(e) => handleInputs(e, "password")}
          autoComplete="on"
          required />
        <button>Entrar</button>
      </form>
      <p onClick={() => navigate("/sign-up")}>Primeira vez? Cadastre-se!</p>
    </LoginSection>
  )
}


const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  height:100vh;
  
  h1 {
    font-family: 'Saira Stencil One', cursive;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
  }

  input {
    display: flex;
    justify-content: center;
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px;
    border:none;
    margin-bottom: 13px;
    padding-left:15px;
    font-size: 20px;
    color: #000000;
  }

  button {
    width: 326px;
    height: 46px;
    background-color: #A328D6;
    border-radius: 5px;
    border:none;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
  }

  p {
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    margin-top: 36px;
    font-family: 'Raleway', sans-serif
  }
`