import React, { useState, useEffect } from 'react';
import { LoanApplicationProvider } from '../contexts/LoanApplicationContext'

import * as SecureStore from 'expo-secure-store'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen'
import DashboardScreen from '../screens/DashboardScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SignUpPersonal from '../screens/SignupPersonalScreen'

import AccountScreen from '../screens/AccountScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import DataSettingScreen from '../screens/DataSettingScreen';
import TransferScreen from '../screens/TransferScreen';
import SupportScreen from '../screens/SupportScreen';
import BusinessHubScreen from '../screens/BusinessHubScreen';
import InvoiceScreen from '../screens/InvoiceScreen';

import SideBar from '../components/SideBar'
import ReportScreen from '../screens/ReportScreen';
import FilterBarReport from '../components/FilterBarReport';
import LoanScreen from '../screens/LoanScreen';
import FilterBar from '../components/FilterBar';
import LoanApplicationScreen from '../screens/LoanApplicationScreen';
import ConnectedPartiesScreen from '../screens/ConnectedPartiesScreen';
import LoanApplicationDeclarationScreen from '../screens/LoanApplicationDeclarationScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import FilterBarWithdrawal from '../components/FilterBarWithdrawal';
import NewInvoiceScreen from '../screens/NewInvoiceScreen';
import NewInvoiceItemsScreen from '../screens/NewInvoiceItemsScreen';

import NewInvoiceReviewScreen from '../screens/NewInvoiceReviewScreen';
import LoanMiniDetailScreen from '../screens/LoanMiniDetailScreen';
import LoanDetailScreen from '../screens/LoanDetailScreen';
import RepaymentInfo from '../screens/RepaymentInfo';
import LoanBillListScreen from '../screens/LoanBillListScreen';
import LoanBillDetailScreen from '../screens/LoanBillDetailScreen';
import LoanSuccessScreen from '../screens/LoanSuccessScreen';
import TransferSuccessScreen from '../screens/TransferSuccessScreen';
import WIthdrawApplicationScreen from '../screens/WIthdrawApplicationScreen';
import WithdrawSuccessScreen from '../screens/WithdrawSuccessScreen';
import BankListScreen from '../screens/BankListScreen';
import AddBankScreen from '../screens/AddBankScreen';
import WithdrawalDetailScreen from '../screens/WithdrawalDetailScreen';
import InvoiceSuccessScreen from '../screens/InvoiceSuccessScreen';
import LoanPaymentSuccessScreen from '../screens/LoanPaymentSuccessScreen';
//import RegistrationStack from './RegistrationNav';

import IntroScreen from '../screens/IntroScreen';
import SignupPersonalScreen from '../screens/SignupPersonalScreen';
import CompanyInformationScreen from '../screens/CompanyInformationScreen';
import ContactPersonScreen from '../screens/ContactPersonScreen';
import ContactPersonSuccessScreen from '../screens/ContactPersonSuccessScreen';
import CompanyContactInformationScreen from '../screens/CompanyContactInformationScreen';
import CompanyContactAddressInformationScreen from '../screens/CompanyContactAddressInformationScreen';
import AgreementScreen from '../screens/AgreementScreen';
import CompanyInfoSuccessScreen from '../screens/CompanyInfoSuccessScreen';
import SignupPersonalSuccessScreen from '../screens/SignupPersonalSuccessScreen';
import CompanyDocumentScreen from '../screens/CompanyDocumentScreen';
import DocumentCameraScreen from '../screens/DocumentCameraScreen';
import DocumentUploadScreen from '../screens/DocumentUploadScreen';
import CompanyDocumentSuccessScreen from '../screens/CompanyDocumentSuccessScreen';
import RegistrationDeclarationScreen from '../screens/RegistrationDeclarationScreen';
import AdminApprovalScreen from '../screens/AdminApprovalScreen';
import ItemScreen from '../screens/ItemScreen';
import VendorScreen from '../screens/VendorScreen';
import CustomerScreen from '../screens/CustomerScreen';
import ChangeNumberScreen from '../screens/ChangeNumberScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AuthOptionScreen from '../screens/AuthOptionScreen';
import NotiSettingScreen from '../screens/NotiSettingScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import ItemAddSuccessScreen from '../screens/ItemAddSuccessScreen';
import ItemAddScreen from '../screens/ItemAddScreen';
import RegistrationStack from './RegistrationNav';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const Nav = (props) => {

    const [tokenExists, setTokenExists] = useState(false)

    const checkLogin = async () => {
        try {
            //const personalToken = await AsyncStorage.getItem('personalToken');
            const personalToken = await SecureStore.getItemAsync('personalToken')
            if (personalToken !== null && !personalToken.includes('error')) {
                //console.log(`personal token ialah : ${personalToken}`)
                setTokenExists(true)
            }
        } catch (error) {
            console.log(`personalToken yang aneh error ${JSON.stringify(error)}`)
            return 'takde'
        }
    }

    useEffect(() => {
        checkLogin()

    }, [])




    return (
        <NavigationContainer>
            <Stack.Navigator>
                 {tokenExists ?
                    <Stack.Screen name="Dashboard" component={MainDrawer} options={{ headerShown: false }} /> :
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />}
                <Stack.Screen name="Registration" component={RegistrationStack} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}



const MainDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<SideBar nav={nav} close={close} />)
        }}> 
            <Drawer.Screen name="Dashboard" component={DashboardStack} />
            <Drawer.Screen name="Account" component={AccountScreen} />
            <Drawer.Screen name="Report" component={ReportDrawer} />
            <Drawer.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Drawer.Screen name="Loan" component={LoanStackWithModal} />
            {/* <Drawer.Screen name="Notification" component={NotificationScreen} /> */}
            <Drawer.Screen name="DataSetting" component={DataSettingStack} />
            <Drawer.Screen name="Transfer" component={TransferStack} />
            <Drawer.Screen name="Support" component={SupportScreen} />
            <Drawer.Screen name="BusinessHub" component={BusinessHubScreen} />
            <Drawer.Screen name="Invoice" component={NewInvoiceStack} />
        </Drawer.Navigator>
    )
}

const DashboardStack = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Withdraw" component={WithdrawalDrawer} />
        </Stack.Navigator>
    )
}


const ReportDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Report" drawerPosition={'right'} drawerContent={props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarReport nav={nav} close={close} />)
        }}>
            <Drawer.Screen name="Report" component={ReportScreen} />
        </Drawer.Navigator>

    )
}

const LoanStackWithModal = () => {
    return (
        <Stack.Navigator initialRouteName="Loan" mode="modal" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loan" component={LoanStack} />
            <Stack.Screen name="LoanMiniDetail" component={LoanMiniDetailScreen} />
            <Stack.Screen name="LoanDetail" component={LoanDetailScreen} />
            <Stack.Screen name="RepayInfo" component={RepaymentInfo} />
            <Stack.Screen name="LoanBillList" component={LoanBillListScreen} />
            <Stack.Screen name="LoanBillDetail" component={LoanBillDetailScreen} />
            <Stack.Screen name="LoanPaymentSuccess" component={LoanPaymentSuccessScreen} />
        </Stack.Navigator>
    )
}

const LoanStack = () => {
    return (
        <Stack.Navigator initialRouteName="Loan" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loan" component={LoanDrawer} />
            <Stack.Screen name="LoanApplication" component={LoanApplicationStack} />
            <Stack.Screen name="Withdraw" component={WithdrawalDrawer} />
        </Stack.Navigator>
    )
}

const LoanDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Loan" drawerPosition={'right'} drawerContent={props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBar nav={nav} close={close} />)
        }}>
            <Drawer.Screen name="Loan" component={LoanScreen} />
        </Drawer.Navigator>

    )
}

const LoanApplicationStack = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoanApplication" component={LoanApplicationScreen} />
            <Stack.Screen name="ConnectedParties" component={ConnectedPartiesScreen} />
            <Stack.Screen name="LoanApplicationDeclaration" component={LoanApplicationDeclarationScreen} />
            <Stack.Screen name="LoanSuccess" component={LoanSuccessScreen} />
        </Stack.Navigator>

    )
}


const WithdrawalDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Withdraw" drawerPosition={'right'} drawerContent={props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBarWithdrawal nav={nav} close={close} />)
        }}>
            <Drawer.Screen name="Withdraw" component={WithdrawStack} />
        </Drawer.Navigator>
    )
}

const WithdrawStack = () => {
    return (
        <Stack.Navigator initialRouteName="Withdraw" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WithdrawalDetail" component={WithdrawalDetailScreen} />
            <Stack.Screen name="Withdraw" component={WithdrawScreen} />
            <Stack.Screen name="BankList" component={BankListScreen} />
            <Stack.Screen name="AddBank" component={AddBankScreen} />
            <Stack.Screen name="WithdrawalApplication" component={WIthdrawApplicationScreen} />
            <Stack.Screen name="WithdrawSuccess" component={WithdrawSuccessScreen} />

        </Stack.Navigator>
    )
}


const TransferStack = () => {
    return (
        <Stack.Navigator initialRouteName="Transfer" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Transfer" component={TransferScreen} />
            <Stack.Screen name="TransferSuccess" component={TransferSuccessScreen} />
        </Stack.Navigator>
    )
}

const InvoiceStack = () => {
    return (
        <Stack.Navigator initialRouteName="Invoice" screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Invoice" component={InvoiceScreen} />
            <Stack.Screen name="NewInvoice" component={NewInvoiceScreen} />

        </Stack.Navigator>
    )
}

const InvoiceDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Loan" drawerPosition={'right'} drawerContent={props => {
            const close = () => { props.navigation.closeDrawer() }
            const nav = (screen) => { props.navigation.navigate(screen) }
            return (<FilterBar nav={nav} close={close} />)
        }}>
            <Drawer.Screen name="Loan" component={LoanScreen} />
        </Drawer.Navigator>

    )
}

const NewInvoiceStack = () => {
    return (

        <Stack.Navigator initialRouteName="NewInvoice" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NewInvoice" component={NewInvoiceScreen} />
            <Stack.Screen name="NewInvoiceItems" component={NewInvoiceItemsScreen} />
            <Stack.Screen name="NewInvoiceReview" component={NewInvoiceReviewScreen} />
            <Stack.Screen name="InvoiceSuccess" component={InvoiceSuccessScreen} />
        </Stack.Navigator>

    )
}

{/*const Registration = () => {
    return (
        <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Agreement" component={AgreementScreen} />
            <Stack.Screen name="SignUpPersonal" component={SignupPersonalScreen} />
            <Stack.Screen name="SignUpPersonalSuccess" component={SignupPersonalSuccessScreen} />
            <Stack.Screen name="CompanyInformation" component={CompanyInformationScreen} />
            <Stack.Screen name="CompanyContactInformation" component={CompanyContactInformationScreen} />
            <Stack.Screen name="CompanyInfoSuccess" component={CompanyInfoSuccessScreen} />
            <Stack.Screen name="ContactPerson" component={ContactPersonScreen} />
            <Stack.Screen name="ContactPersonSuccess" component={ContactPersonSuccessScreen} />
            <Stack.Screen name="CompanyDocument" component={CompanyDocumentScreen} />
            <Stack.Screen name="CompanyDocumentSuccess" component={CompanyDocumentSuccessScreen} />
            <Stack.Screen name="RegistrationDeclaration" component={RegistrationDeclarationScreen} />
            <Stack.Screen name="AdminApproval" component={AdminApprovalScreen} />
        </Stack.Navigator>
    )
} 

const RegistrationStack = () => {
    return (
        <Stack.Navigator initialRouteName="Intro" mode="modal" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={Registration} />
            <Stack.Screen name="DocumentCamera" component={DocumentCameraScreen} />
            <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
            <Stack.Screen name="CompanyContactAddressInformation" component={CompanyContactAddressInformationScreen} />
        </Stack.Navigator>
    )
} */}

const DataSettingStack = () => {
    return (
        <Stack.Navigator initialRouteName="DataSetting" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DataSetting" component={DataSettingScreen} />
            <Stack.Screen name="Item" component={ItemStack} />
            <Stack.Screen name="Vendor" component={VendorScreen} />
            <Stack.Screen name="Customer" component={CustomerScreen}/>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/> 
            <Stack.Screen name="ChangeNumber" component={ChangeNumberScreen}/> 
            <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen}/> 
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/> 
            <Stack.Screen name="EditProfile" component={EditProfileScreen}/> 
            <Stack.Screen name="NotiScreen" component={NotiSettingScreen}/> 
            <Stack.Screen name="AuthOption" component={AuthOptionScreen}/> 
        </Stack.Navigator>
    )
}
const ItemStack = () => {
    return (
        <Stack.Navigator initialRouteName="Item" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Item" component={ItemScreen} />
            <Stack.Screen name="ItemDetail" component={ItemDetailScreen}/>
            <Stack.Screen name="ItemAdd" component={ItemAddScreen}/>
            <Stack.Screen name="ItemAddSuccess" component={ItemAddSuccessScreen}/>
        </Stack.Navigator>
    )
}

export default Nav;
