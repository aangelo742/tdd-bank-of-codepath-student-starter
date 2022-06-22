import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {
  /* DEFAULT STATE AND HANDLERS */

  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState()
  const [transfers, setTransfers] = useState()
  const [error, setError] = useState()
  const [filterInputValue, setFilterInputValue] = useState("")

  return (
    <div className="app">
      <BrowserRouter>
        <nav>
          <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
          </Routes>
          <Home />
        </main>
      </BrowserRouter>     
    </div>
  )
}
