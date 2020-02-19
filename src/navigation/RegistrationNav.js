
import { createStackNavigator } from '@react-navigation/stack';

//import { createStackNavigator } from '@react-navigation/stack';

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

const Stack = createStackNavigator();

const Registration = () => {
    return (
        <Stack.Navigator initialRouteName="Registration" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Agreement" component={AgreementScreen} />
            <Stack.Screen name="SignupPersonalScreen" component={SignupPersonalScreen} />
            <Stack.Screen name="SignUpPersonalSuccess" component={ SignupPersonalSuccessScreen}/>
            <Stack.Screen name="CompanyInformation" component={CompanyInformationScreen} />
            <Stack.Screen name="CompanyContactInformation" component={CompanyContactInformationScreen} />
            <Stack.Screen name="CompanyInfoSuccess" component={ CompanyInfoSuccessScreen} />
            <Stack.Screen name="ContactPerson" component={ContactPersonScreen} />
            <Stack.Screen name="ContactPersonSuccess" component={ContactPersonSuccessScreen} />
            <Stack.Screen name="CompanyDocument" component={ CompanyDocumentScreen} />
            <Stack.Screen name="CompanyDocumentSuccess" component={CompanyDocumentSuccessScreen} />
            <Stack.Screen name="RegistrationDeclaration" component={RegistrationDeclarationScreen} />
            <Stack.Screen name="AdminApproval" component={AdminApprovalScreen} />
        </Stack.Navigator>
    )
}

const RegistrationStack= () => {
    return (
        <Stack.Navigator initialRouteName="Main" mode="modal" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Registration} />
            <Stack.Screen name="DocumentCamera" component={ DocumentCamera} />
            <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
            <Stack.Screen name="CompanyContactAddressInformation" component={CompanyContactAddressInformationScreen} />
        </Stack.Navigator>
    )
}

export default RegistrationStack