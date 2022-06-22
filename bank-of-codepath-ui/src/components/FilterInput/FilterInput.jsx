import * as React from "react"
import "./FilterInput.css"

export default function FilterInput(props) {
  console.log("Inside of FilterInput function: ", props.inputValue)
  return (
    <div className="filter-input">
      <i className="material-icons">search</i>
      <input 
        type="text" 
        placeholder="Search transactions" 
        value = {props.inputValue}
        onChange = {props.handleOnChange}
        />
    </div>
  )
}
