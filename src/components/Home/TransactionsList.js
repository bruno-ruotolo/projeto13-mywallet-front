import { TransactionsDiv } from "./style"

export default function TransactionsList(props) {
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
