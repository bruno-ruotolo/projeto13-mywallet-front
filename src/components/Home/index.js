import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import Swal from "sweetalert2";

import { UserContext } from "../../contexts/userContext";
import TransactionsList from "./TransactionsList";

import { HomeSection, Header, MainCointeiner, Main, MainBottom, Footer, Button } from "./style";

export default function Home() {
  const navigate = useNavigate();

  const { userInfos: { token, name } } = useContext(UserContext);
  const [transactionsInfos, setTransactionsInfos] = useState([]);
  const [balance, setBalance] = useState({ value: 0, status: true });
  const [homeStatus, setHomeStatus] = useState(true);

  useEffect(() => {
    setHomeStatus(false);
    const URL = "https://projeto13-mywallet-back-bruno.herokuapp.com/home"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.get(URL, config);

    promise.then((response) => {
      setHomeStatus(true);
      setTransactionsInfos(response.data);
    });

    promise.catch(e => {
      setHomeStatus(true);
      Swal.fire({
        icon: "warning",
        title: "Sessão Experidada",
        text: 'Faça Login Novamente',
        width: 326
      })
      navigate("/");
    })
  }, [token, navigate]);

  function logout() {
    setHomeStatus(false);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const URL = "https://projeto13-mywallet-back-bruno.herokuapp.com/home"
    axios.put(URL, { status: false }, config);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  }

  useEffect(() => {
    let total = 0
    transactionsInfos.forEach(({ value, status }) => {
      status ? total += parseFloat(value.replace(",", ".")) : total -= parseFloat(value.replace(",", "."))
    });
    total < 0
      ? setBalance({ status: false, value: total })
      : setBalance({ status: true, value: total });
  }, [transactionsInfos]);
  return (
    <HomeSection>
      <Header>
        <h2>Olá, {name}</h2>
        <ion-icon name="log-out-outline" onClick={logout}></ion-icon>
      </Header >

      <MainCointeiner>
        <Main>
          {transactionsInfos.length === 0
            ? (homeStatus
              ? <span>Não há registros de entrada ou saída</span>
              : <span><Rings color="#8C11BE" width="100%" height="150px" /></span>)
            : (
              transactionsInfos.map((transaction, index) => {
                const { description, status, value, date } = transaction;
                return (
                  <div key={Date.now() * Math.random()}>
                    <TransactionsList
                      key={index}
                      description={description}
                      status={status}
                      value={value}
                      date={date}
                    />
                    <MainBottom balanceStatus={balance.status}>
                      <p>Saldo</p>
                      <strong>{balance.value.toFixed(2).toString().replace(".", ",").replace("-", "")}</strong>
                    </MainBottom>
                  </div>
                )
              })
            )
          }
        </Main>
      </MainCointeiner>
      <Footer>
        <Button onClick={() => navigate("/new-entry")}>
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>Nova entrada</p>
        </Button>

        <Button onClick={() => navigate("/new-exit")}>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>Nova saída</p>
        </Button>
      </Footer>
    </HomeSection >
  )
}