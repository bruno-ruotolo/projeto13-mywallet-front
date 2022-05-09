import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";

import { RegisterSection } from "./style";

export default function Register() {
  const navigate = useNavigate();

  const [userRegister, setUserRegister] = useState({ name: "", email: "", password: "", passwordConfirm: "" });
  const [registerStatus, setRegisterStatus] = useState(false);

  function handleInputs(e, property) {
    setUserRegister({ ...userRegister, [property]: e.target.value })
  }

  function sendData(e) {
    e.preventDefault();
    setRegisterStatus(true);
    const URL = "http://localhost:5000/sign-up"
    const promise = axios.post(URL, userRegister);
    promise.then((response) => {
      Swal.fire({
        icon: 'success',
        title: "Cadastro Realizado",
        width: 326,
        heigth: 200
      });
      setRegisterStatus(false);
      navigate("/");
    });

    promise.catch((e) => {
      if (e.response.data[0] === "\"passwordConfirm\" must be [ref:password]") {
        Swal.fire({
          icon: 'error',
          title: "Senhas inconsistentes",
          text: 'Verique se as senhas são correspondentes',
          width: 326,
          heigth: 200
        });
      } else if (e.response.data[0] === "\"email\" must be a valid email") {
        Swal.fire({
          icon: 'error',
          title: "E-mail Incorreto",
          text: 'Verique se digitou seu e-mail corretamente',
          width: 326,
          heigth: 200
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: e.response.data,
          text: 'Verifique seus dados e tente novamente',
          width: 326,
          heigth: 200
        });
      }
      setRegisterStatus(false);
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
          disabled={registerStatus}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={userRegister.email}
          onChange={(e) => handleInputs(e, "email")}
          required
          disabled={registerStatus}
        />

        <input
          type="password"
          placeholder="Senha"
          value={userRegister.password}
          onChange={(e) => handleInputs(e, "password")}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)[A-Za-z\d]{6,}$"
          title="No mínimo 6 caracteres com ao menos uma maiscula, uma minuscula e um número"
          autoComplete="on"
          required
          disabled={registerStatus}
        />

        <input
          type="password"
          placeholder="Confirme a Senha"
          value={userRegister.passwordConfirm}
          onChange={(e) => handleInputs(e, "passwordConfirm")}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)[A-Za-z\d]{6,}$"
          title="No mínimo 6 caracteres com ao menos uma maiscula, uma minuscula e um número"
          autoComplete="on"
          required
          disabled={registerStatus}
        />

        <button disabled={registerStatus}>{!registerStatus ? "Cadastrar" : <Rings color="#ffffff" />}</button>
      </form>
      <p onClick={() => navigate("/")}>Já tem uma conta? Entre agora!</p>
    </RegisterSection>
  )
}