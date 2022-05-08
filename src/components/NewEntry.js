import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function NewEntry() {
  const navigate = useNavigate();

  const { userInfos: { token } } = useContext(UserContext);
  console.log(token)

  const [entry, setEntry] = useState({ value: "", description: "" })

  function sendData(e) {
    e.preventDefault();

    const URL = "http://localhost:5000/new-entry"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.post(URL, entry, config);
    promise.then((res) => {
      console.log("Entrada Realizada");
      navigate("/home");
    });
    promise.catch((e) => {
      console.log("Algo deu errado", e);
    })
  }

  function handleInputs(e, property) {
    setEntry({ ...entry, [property]: e.target.value })
  }

  return (
    <NewEntrySection>
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
          required />

        <input
          type="text"
          placeholder="Descrição"
          value={entry.description}
          onChange={(e) => handleInputs(e, "description")}
          required />
        <button>Salvar entrada</button>
      </form>

    </NewEntrySection>
  )

}
const NewEntrySection = styled.section`
  height: 100vh;
  width: 326px;
  padding: 25px 0;
  display: flex;
  flex-direction: column;

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
`

const Header = styled.header` 
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin-bottom: 40px;
`