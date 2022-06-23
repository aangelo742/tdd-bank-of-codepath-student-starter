import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {

  const handleOnFormFieldChange = event => {
    const { name, value } = event.target;
    props.setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm 
        handleOnFormFieldChange = {handleOnFormFieldChange} 
        form = {props.form}
        handleOnSubmit = {props.handleOnSubmit}
        isCreating = {props.isCreating}
      />
    </div>
  )
}

export function AddTransactionForm(props) {
  if(props.form) {
    return (
      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input 
              name="description"
              value={props.form.description}
              type="text"
              onChange={props.handleOnFormFieldChange}  
            />
          </div>
          <div className="field">
            <label>Category</label>
            <input 
              name="category"
              value={props.form.category}
              type="text"
              onChange={props.handleOnFormFieldChange}
              
            />
          </div>
          <div className="field half-flex">
            <label>Amount (cents)</label>
            <input 
              name="amount"
              value={props.form.amount}
              type="number"
              onChange={props.handleOnFormFieldChange}
              
            />
          </div>
  
          <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit}>
            Add
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
    
  
}
