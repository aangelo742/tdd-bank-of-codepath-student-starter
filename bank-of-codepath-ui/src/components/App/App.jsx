import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {
  /* DEFAULT STATE AND HANDLERS */

  const [isLoading, setIsLoading] = useState(false) // 1
  const [transactions, setTransactions] = useState([]) // 2
  const [transfers, setTransfers] = useState([]) // 3
  const [error, setError] = useState() // 4
  const [filterInputValue, setFilterInputValue] = useState("") // 5
  const [newTransactionForm, setNewTransactionForm] = useState({amount: 0, category: "", description: ""}) // 6
  const [isCreating, setIsCreating] = useState(false) // 7

  return (
    <div className="app">
      <BrowserRouter>
        <nav>
          <Navbar 
            filterInputValue={filterInputValue} 
            setFilterInputValue={setFilterInputValue}
          />
        </nav>
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
              <Home 
                transactions = {transactions}
                setTransactions = {setTransactions}
                transfers = {transfers}
                setTransfers = {setTransfers}
                error = {error}
                setError = {setError}
                isLoading = {isLoading}
                setIsLoading = {setIsLoading}
                filterInputValue = {filterInputValue}
                newTransactionForm = {newTransactionForm}
                setNewTransactionForm = {setNewTransactionForm}
                isCreating = {isCreating}
                setIsCreating = {setIsCreating}
              />} 
            />
            <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
          </Routes>
          <Home />
        </main>
      </BrowserRouter>     
    </div>
  )
}
