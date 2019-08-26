import React, { useState, createContext } from 'react'

export const LoanApplicationContext = createContext()
export const LoanApplicationProvider = props => {
    const [loanData, setLoanData] = useState([])
    const test = (val) => {
        console.log(`values have been set ${JSON.stringify(val)}`)
        setLoanData(val)
    }
    return (
        <LoanApplicationContext.Provider value={[loanData, setLoanData, test]}>
            {props.children}
        </LoanApplicationContext.Provider>
    )
} 