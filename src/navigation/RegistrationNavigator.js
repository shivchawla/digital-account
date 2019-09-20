import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';



import IntroScreen from '../screens/IntroScreen';
import SignupPersonalScreen from '../screens/SignupPersonalScreen';
// import SignupOtpScreen from '../screens/SignupOtpScreen';
// import SignupOtpEnterScreen from '../screens/SignupOtpEnterScreen';
//import SignupSuccessScreen from '../screens/SignupSuccessScreen';
import CompanyInformationScreen from '../screens/CompanyInformationScreen';
import ContactPersonScreen from '../screens/ContactPersonScreen';
import ContactPersonSuccessScreen from '../screens/ContactPersonSuccessScreen';
// import DetailsOfConnectedPartiesScreen from '../screens/DetailsOfConnectedPartiesScreen';
// import DeclarationDigitalSignScreen from '../screens/DeclarationDigitalSignScreen';
// import CompanyInfoIntroScreen from '../screens/CompanyInfoIntroScreen';
// import DocUploadScreen from '../screens/DocUploadScreen';
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
// import ContactPersonSuccessScreen from '../screens/ContactPersonSuccessScreen';
// import CameraICScreen from '../screens/CameraICScreen';

const Registration = createStackNavigator({
  // Intro: IntroScreen,
  // Agreement: AgreementScreen,
  // SignUpPersonal: SignupPersonalScreen,
  SignUpPersonalSuccess: SignupPersonalSuccessScreen,
  CompanyInformation: CompanyInformationScreen,
  CompanyContactInformation: CompanyContactInformationScreen,

  CompanyInfoSuccess: CompanyInfoSuccessScreen,
  ContactPerson: ContactPersonScreen,
  ContactPersonSuccess: ContactPersonSuccessScreen,
  CompanyDocument: CompanyDocumentScreen,

  CompanyDocumentSuccess: CompanyDocumentSuccessScreen,
  RegistrationDeclaration: RegistrationDeclarationScreen


  // DetailsConnectedParties: DetailsOfConnectedPartiesScreen,
  // DeclarationDigitalSign: DeclarationDigitalSignScreen,
});

const RegistrationStack = createStackNavigator(
  {
    Main: { screen: Registration, },
    // DocUpload: { screen: DocUploadScreen, },
    // CameraIC: { screen: CameraICScreen, },
    DocumentCamera: { screen: DocumentCameraScreen },
    DocumentUpload: { screen: DocumentUploadScreen },

    CompanyContactAddressInformation: { screen: CompanyContactAddressInformationScreen },

  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default RegistrationStack