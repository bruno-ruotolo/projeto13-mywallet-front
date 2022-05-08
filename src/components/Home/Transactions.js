import styled from "styled-components"

export default function Transactions(props) {
  const { description, status, value, date } = props;

  return (
    <>
      <TransactionsDiv status={status}>
        <div>
          <small>{date}</small>
          <p>{description}</p>
        </div>
        <strong>{value}</strong>
      </TransactionsDiv>
    </>
  )
}

const TransactionsDiv = styled.div`
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