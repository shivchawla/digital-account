import React, { useState, createContext } from 'react'

export const PersonalInfoContext = createContext()
export const PersonalInfoProvider = props => {
    const [personalInfo, setpersonalInfo] = useState([])

    return (
        <PersonalInfoContext.Provider value={[personalInfo, setpersonalInfo,]}>
            {props.children}
        </PersonalInfoContext.Provider>
    )
} 