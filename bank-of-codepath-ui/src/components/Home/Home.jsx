import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios"
import { useEffect } from "react"

export default function Home(props) {
  const filteredTransactions = props.filterInputValue ? props?.transactions.filter((transaction) => 
    transaction.description.toLowerCase().indexOf(props.filterInputValue.toLowerCase()) !== -1) : props?.transactions
  
  const getData = async () => {
    try {
      const transactionsResult = await axios.get("http://localhost:3001/bank/transactions")
      const transactionsData = transactionsResult.data
      if(transactionsData && transactionsData.transactions) {
        props.setTransactions(transactionsData.transactions)
      }
      const transfersResult = await axios.get("http://localhost:3001/bank/transfers")
      const transfersData = transfersResult.data
      if(transfersData && transfersData.transfers) {
        props.setTransfers(transfersData.transfers)
      }
      props.setIsLoading(false)
    } catch (err) {
        props.setError(err)  
    }
  }

  useEffect(() => {
    if(props.setIsLoading != null) {
      props.setIsLoading(true)
      getData()
    }
     
  }, []);

  const handleOnCreateTransaction = async () => {
    props.setIsCreating(true)
    await axios.post("http://localhost:3001/bank/transactions", {transaction: props.newTransactionForm})
    .catch((err) => {
      props.setError(err)
      props.setIsCreating(false)
    })
    .then(res => {
      props.setTransactions((prevTransactions) => [...prevTransactions, res?.data?.transaction])
    })
    .finally(() => {
      props.setNewTransactionForm({
        category: "",
        description: "",
        amount: 0
      })
      props.setIsCreating(false)
    })


  }
  return (
    <div className="home">
      <AddTransaction 
        isCreating = {props.isCreating}
        setIsCreating = {props.setIsCreating}
        form = {props.newTransactionForm}
        setForm = {props.setNewTransactionForm}
        handleOnSubmit = {handleOnCreateTransaction}
      />  
      {
        props.error ? <h2 className="error">Error message</h2> : null
      }
      {
      props.isLoading ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions} transfers={props.transfers}/>
      }
      
    </div>
  )
}
