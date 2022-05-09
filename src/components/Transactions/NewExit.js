import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";

import { TransactionSection, Header } from "./style";

export default function NewExit() {
  const navigate = useNavigate();

  const { userInfos: { token } } = useContext(UserContext);

  const [exit, setExit] = useState({ value: "", description: "" });
  const [exitStatus, setExitStatus] = useState(false);

  function sendData(e) {
    e.preventDefault();
    setExitStatus(true);

    const URL = "https://projeto13-mywallet-back-bruno.herokuapp.com/new-exit"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.post(URL, exit, config);
    promise.then((res) => {
      Swal.fire({
        icon: 'success',
        title: "Saída Realizada",
        width: 326
      });
      setExitStatus(false);
      navigate("/home");
    });
    promise.catch((e) => {
      if (e.response.data === "Token Inexistente") {
        Swal.fire({
          icon: "warning",
          title: "Sessão Experidada",
          text: 'Faça Login Novamente',
          width: 326
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: 'error',
          title: "Algo deu Errado",
          text: 'Verifique seus dados e tente novamente',
          width: 326,
          height: 200
        });
      }
      setExitStatus(false);
    })
  }

  function handleInputs(e, property) {
    setExit({ ...exit, [property]: e.target.value })
  }

  return (
    <TransactionSection>
      <Header>
        <h2>Nova saída</h2>
      </Header >
      <form onSubmit={sendData}>
        <input
          type="text"
          placeholder="Valor"
          value={exit.value}
          onChange={(e) => handleInputs(e, "value")}
          pattern="(^[0-9]+,\d{1,2}$)|(^[0-9]+$)"
          title='Somente números, virgula e dois decimais nos centavos'
          required
          disabled={exitStatus}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={exit.description}
          onChange={(e) => handleInputs(e, "description")}
          required
          disabled={exitStatus}
        />
        <button disabled={exitStatus}>{!exitStatus ? "Salvar saída" : <Rings color="#ffffff" />}</button>
      </form>
    </TransactionSection>
  )
}