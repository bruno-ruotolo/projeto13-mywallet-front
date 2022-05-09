import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";

import { TransactionSection, Header } from "./style";

export default function NewEntry() {
  const navigate = useNavigate();

  const { userInfos: { token } } = useContext(UserContext);

  const [entry, setEntry] = useState({ value: "", description: "" })
  const [entryStatus, setEntryStatus] = useState(false);

  function sendData(e) {
    e.preventDefault();
    setEntryStatus(true);

    const URL = "http://localhost:5000/new-entry"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.post(URL, entry, config);
    promise.then((res) => {
      Swal.fire({
        icon: 'success',
        title: "Entrada Realizada",
        width: 326,
        heigth: 200
      });
      setEntryStatus(false);
      navigate("/home");
    });
    promise.catch((e) => {
      if (e.response.data === "Token Inexistente") {
        Swal.fire({
          icon: "warning",
          title: "Sessão Experidada",
          text: 'Faça Login Novamente',
          width: 326,
          heigth: 200
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
      setEntryStatus(false);
    })
  }

  function handleInputs(e, property) {
    setEntry({ ...entry, [property]: e.target.value })
  }

  return (
    <TransactionSection>
      <Header>
        <h2>Nova entrada</h2>
      </Header >
      <form onSubmit={sendData}>
        <input
          type="text"
          placeholder="Valor"
          value={entry.value}
          onChange={(e) => handleInputs(e, "value")}
          pattern="(^[0-9]+,\d{1,2}$)|(^[0-9]+$)"
          title='Somente números, virgula e dois decimais nos centavos'
          required
          disabled={entryStatus}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={entry.description}
          onChange={(e) => handleInputs(e, "description")}
          required
          disabled={entryStatus}
        />
        <button disabled={entryStatus}>{!entryStatus ? "Salvar entrada" : <Rings color="#ffffff" />}</button>
      </form>
    </TransactionSection>
  )
}