import styled from "styled-components"

export const TransactionSection = styled.section`
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
    display: flex;
    align-items:center;
    justify-content: center;
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

export const Header = styled.header` 
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin-bottom: 40px;
`