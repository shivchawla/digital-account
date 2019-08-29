import { AsyncStorage } from 'react-native'
import * as SecureStore from 'expo-secure-store'

import Amplify, { Auth, Storage } from 'aws-amplify';
import aws_exports from '../../aws-exports';
Amplify.configure(aws_exports);///

import s3 from '../../do/DigitalOcean'
import config from '../../do/config'

import { requestToken, kycMobile, kycMobileVerify, kycBasicInformation, requestPersonalToken, urlToBlob, kycBasicInformation2, kycPinNumber, registerApi, registerOTPApi, verifyPhoneApi, companyInfoAPI, contactPersonAPI, detailConnectAPI, declarationSignAPI, requestTokenLMS, registerLMSApi, requestPersonalTokenLMS } from './apiRegistration'
import { userInfo, latestTransaction, depositApi, sendMoney, withdrawApi, requestMoney, analyticSummary, notificationApi, analytic, userList, resetPinApi, editMobileDetail, editMobileDetailVerify, pushNotification, editPersonalDetail, newsApi, eventApi, promotionApi, handbooksApi, einfoApi, applyLoanApi, getUserInfoApi, getCompanyInfoApi, getListWorkersApi, doneForNowApi, sendNotificationApi, bizDirApi, listAgencyApi, addExpoTokenApi, connectionStatusApi, getAssociateApi, getPendingApi, loanInfoApi, getCoursesApi, editUserApi, generateJWTApi, requestConnectApi, applyGrantApi, grantInfoApi, acceptApi } from './apiDashboard'
//import {pusherListen} from './pusher'
import moment from 'moment'

import shortid from 'shortid'
import _ from 'lodash'

export const getToken = () => {
    console.log(`dipanggil`)
    return (dispatch, getState) => {
        dispatch(requestToken())
    }
}



export const register = (values) => {
    return async (dispatch, getState) => {
        const { name, email, password, password_confirmation } = values
        const { token_type, access_token, expo_token } = await getState().registrationReducer
        console.log(`ada ke tak register info : ${JSON.stringify(values)} || ${JSON.stringify(getState().registrationReducer)}`)
        console.log('takde error dalam screen and boleh proceed utk register')
        await dispatch(registerApi(token_type, access_token, name, email, password, password_confirmation, expo_token))
        //await dispatch(getPersonalToken())
    }
}

export const getPersonalToken = () => {
    return async (dispatch, getState) => {
        const username = getState().registrationReducer.email
        const password = getState().registrationReducer.password
        console.log(`action : ${username} dan ${password}`)
        await dispatch(requestPersonalToken('register', username, password))
    }
}



export const login1 = (values) => {
    return (dispatch, getState) => {
        const { email, password } = values
        dispatch(requestPersonalToken('login', email, password))
    }
}

export const companyInfo = (values) => {
    return async (dispatch, getState) => {
        //const { comp_name, comp_regno, comp_regdate, comp_main_biz_act } = getState().companyInformationReducer
        console.log(`companyInfo yang gagah`)
        console.log(JSON.stringify(values))
        await dispatch({ type: 'SET_COMPANY_INFO', payload: { ...values, } })
    }
}

export const registerCompany = (values) => {
    return async (dispatch, getState) => {
        //const { comp_name, comp_regno, comp_regdate, comp_main_biz_act } = getState().companyInformationReducer
        console.log(`companyInfo yang gagah`)
        console.log(JSON.stringify(values))
        await dispatch(companyInfoAPI())
    }
}

export const contactPerson = (values) => {
    return (dispatch, getState) => {

        dispatch(contactPersonAPI(values))

    }
}
