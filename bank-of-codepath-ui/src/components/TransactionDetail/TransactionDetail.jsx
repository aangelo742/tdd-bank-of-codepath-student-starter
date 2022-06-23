import * as React from "react"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function TransactionDetail() {
  const transactionId = useParams()?.transactionId

  console.log("TransactionDetail: ", transactionId)

  const [hasFetched, setHasFetched] = useState(false)
  const [transaction, setTransaction] = useState({})
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  const fetchTransactionId = async () => {
    setIsLoading(true)
    setHasFetched(false)

    await axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
      .then(res => {
        console.log(res)
        setTransaction(res.data.transaction)
      })
      .catch(error => {
        setError(error)
      })

      setIsLoading(false)
      setHasFetched(true)
  }

  useEffect(() => {
    fetchTransactionId()
  }, [transactionId])

  return (
    <div className="transaction-detail">
      <TransactionCard />
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null }) {
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category"></p>
      </div>

      <div className="card-content">
        <p className="description"></p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  )
}
