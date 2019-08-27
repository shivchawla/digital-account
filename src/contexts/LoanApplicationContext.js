import React, { useState, createContext } from 'react'

export const LoanApplicationContext = createContext()
export const LoanApplicationProvider = props => {
    const [loanData, setLoanData] = useState([])
   
    return (
        <LoanApplicationContext.Provider value={[loanData, setLoanData,]}>
            {props.children}
        </LoanApplicationContext.Provider>
    )
} 