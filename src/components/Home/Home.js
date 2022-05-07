import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../../contexts/userContext";
import Transactions from "./Transactions";

export default function Home() {
  const navigate = useNavigate();

  const { userInfos: { token, name } } = useContext(UserContext);
  const [transactionsInfos, setTransactionsInfos] = useState([]);
  console.log(transactionsInfos);

  console.log(token);

  useEffect(() => {
    const URL = "http://localhost:5000/home"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.get(URL, config);

    promise.then((response) => {
      console.log("Deu bom")
      setTransactionsInfos(response.data);
    });

    promise.catch(e => {
      alert(e.response.data);
      navigate("/")

      console.log(e.response)
    })
  }, [token]);

  function logout() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const URL = "http://localhost:5000/home"
    const promise = axios.put(URL, { status: false }, config);

    promise.then((response) => {
      console.log("Deslogado")
    });

    promise.catch((e) => {
      console.log("Algo deu errado");
      console.log(e.response);
    });

    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  }

  return (
    <HomeSection>
      <Header>
        <h2>Olá, {name}</h2>
        <ion-icon name="log-out-outline" onClick={logout}></ion-icon>
      </Header >

      <MainCointeiner>
        <Main>
          {/* <span>Não há registros de entrada ou saída</span> */}
          {transactionsInfos.length === 0
            ? <span>Não há registros de entrada ou saída</span>
            : (transactionsInfos.map((transaction, index) => {
              const { description, status, value, date } = transaction;
              return (
                <>
                  <Transactions
                    key={index}
                    description={description}
                    status={status}
                    value={value}
                    date={date}
                  />

                  <MainBottom>
                    <p>Saldo</p>
                    <strong>2849,96</strong>
                  </MainBottom>
                </>
              )
            })


            )}

        </Main>
      </MainCointeiner>
      <Footer>
        <Button>
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>Nova entrada</p>
        </Button>

        <Button>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>Nova saída</p>
        </Button>
      </Footer>

    </HomeSection >
  )
}

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  max-width: 326px;
  padding: 25px 0;
`

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;

  h2{
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
  }

  ion-icon {
    font-weight: 700;
    font-size: 30px;
    color: #FFFFFF;
  }
`

const MainCointeiner = styled.main`
  height: 446px;
  width: 326px;
  position: relative;
  overflow: scroll;
`

const Main = styled.section`
  width: 326px;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 23px 15px 30px 15px;
  overflow: scroll;

  span {
    position:absolute;
    inset: 0;
    margin: auto;
    max-width: 180px;
    height: fit-content;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
  }
`

const MainBottom = styled.div`
  width: 100%;
  position: absolute;
  height: 35px;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0 15px;
  border-radius: 5px;

  p {
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
  }

  strong {
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    color: #03AC00;
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between; 
  width: 100%;
`
const Button = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 155px;
  height: 114px;
  background-color: #A328D6;
  border-radius: 5px;

  p {
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
    max-width: 64px;
  }

  ion-icon {
    font-weight: 700;
    font-size: 23px;
    color: #FFFFFF;
  }
`