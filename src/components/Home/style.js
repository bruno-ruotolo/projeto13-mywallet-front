import styled from "styled-components"

export const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  max-width: 326px;
  padding: 25px 0;
`

export const Header = styled.header`
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

export const MainCointeiner = styled.main`
  height: 446px;
  width: 326px;
  position: relative;
  overflow: hidden;
`

export const Main = styled.section`
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

export const MainBottom = styled.div`
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
    color: ${({ balanceStatus }) => balanceStatus ? "#03AC00" : "#C70000"};
  }
`

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between; 
  width: 100%;
`
export const Button = styled.div`
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

//TransactionsList
export const TransactionsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  strong {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${({ status }) => status ? "#03AC00" : "#C70000"};
  }

  div {
  display: flex;

    small {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
    margin-right: 10px;
  }

    p {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    max-width: 150px;
  }
}
`