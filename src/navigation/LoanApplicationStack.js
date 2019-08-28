import React from 'react';



import { LoanApplicationProvider } from '../contexts/LoanApplicationContext'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import LoanApplicationScreen from '../screens/LoanApplicationScreen'
import LoanApplicationDeclarationScreen from '../screens/LoanApplicationDeclarationScreen';
import ConnectedPartiesScreen from '../screens/ConnectedPartiesScreen';


const LoanAppStack = createStackNavigator(
    {
        LoanApplication: LoanApplicationScreen,
        ConnectedParties: ConnectedPartiesScreen,
        LoanApplicationDeclaration: LoanApplicationDeclarationScreen,

    },
);


const LoanApplicationSt = createAppContainer(LoanAppStack)

const LoanApplicationStack = (props) => {
    return (
        <LoanApplicationProvider >
            <LoanApplicationSt   />
        </LoanApplicationProvider>
    )
}

export default LoanApplicationStack;
