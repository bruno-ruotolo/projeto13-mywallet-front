import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Register() {
  const navigate = useNavigate();

  const [userRegister, setUserRegister] = useState({ name: "", email: "", password: "", passwordConfirm: "" });

  function handleInputs(e, property) {
    setUserRegister({ ...userRegister, [property]: e.target.value })
  }

  function sendData(e) {
    e.preventDefault();
    const URL = "http://localhost:5000/sign-up"
    const promise = axios.post(URL, userRegister);
    promise.then((response) => {
      console.log(response.data)
      navigate("/");
    });

    promise.catch((e) => {
      alert(e.response.data);
    });
  }

  return (
    <RegisterSection>
      <h1>MyWallet</h1>
      <form onSubmit={sendData}>
        <input
          type="text"
          placeholder="Nome"
          value={userRegister.name}
          onChange={(e) => handleInputs(e, "name")}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={userRegister.email}
          onChange={(e) => handleInputs(e, "email")}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={userRegister.password}
          onChange={(e) => handleInputs(e, "password")}
          pattern={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)[A-Za-z\d]{6,}$/}
          title={"No mínimo 6 caracteres com ao menos uma maiscula, uma minuscula e um número"}
          autoComplete="on"
          required
        />

        <input
          type="password"
          placeholder="Confirme a Senha"
          value={userRegister.passwordConfirm}
          onChange={(e) => handleInputs(e, "passwordConfirm")}
          pattern={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)[A-Za-z\d]{6,}$/}
          title={"No mínimo 6 caracteres com ao menos uma maiscula, uma minuscula e um número"}
          autoComplete="on"
          required
        />

        <button>Cadastrar</button>
      </form>
      <p onClick={() => navigate("/")}>Já tem uma conta? Entre agora!</p>
    </RegisterSection>
  )
}

const RegisterSection = styled.section`
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