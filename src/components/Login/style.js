import styled from "styled-components"

export const LoginSection = styled.section`
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
  display: flex;
  align-items: center;
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