import * as SecureStore from 'expo-secure-store'

import Amplify, { Auth, Storage } from 'aws-amplify';
import aws_exports from '../../aws-exports';
Amplify.configure(aws_exports);///

import s3 from '../../do/DigitalOcean'
import config from '../../do/config'

import { requestToken, kycMobile, kycMobileVerify, kycBasicInformation, requestPersonalToken, urlToBlob, kycBasicInformation2, kycPinNumber, registerApi, registerOTPApi, verifyPhoneApi, companyInfoAPI, contactPersonAPI, submitDocApi, declarationApi, detailConnectAPI, declarationSignAPI, requestTokenLMS, registerLMSApi, requestPersonalTokenLMS } from './apiRegistration'
import { userInfo, latestTransaction, depositApi, sendMoney, withdrawApi, requestMoney, analyticSummary, notificationApi, analytic, userList, resetPinApi, editMobileDetail, editMobileDetailVerify, pushNotification, editPersonalDetail, newsApi, eventApi, promotionApi, handbooksApi, einfoApi, applyLoanApi, getUserInfoApi, getCompanyInfoApi, getListWorkersApi, doneForNowApi, sendNotificationApi, bizDirApi, listAgencyApi, addExpoTokenApi, connectionStatusApi, getAssociateApi, getPendingApi, loanInfoApi, getCoursesApi, editUserApi, generateJWTApi, requestConnectApi, applyGrantApi, grantInfoApi, acceptApi, retrieveMerchantInfoApi,checkDeclareApi,checkDocumentApi,checkContactApi, } from './apiDashboard'
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

export const submitDoc = (values) => {
    return (dispatch, getState) => {
        dispatch(submitDocApi(values))
    }
}

export const submitDoc1 = (values) => {

    return async (dispatch, getState) => {
        const { isDocument1, isDocument2, isDocument3 } = values
        await dispatch(uploadPic(isDocument1, 'mykad'))
        await dispatch(uploadPic(isDocument2, 'company'))
        await dispatch(uploadPic(isDocument3, 'business'))
        await dispatch(submitDocApi())
    }
}

export const declaration = (values) => {
    return (dispatch, getState) => {
        dispatch(declarationApi(values))
    }
}

export const retrieveMerchantInfo = () => {
    return (dispatch, getState) => {
        console.log('Dekat Action')
        dispatch(retrieveMerchantInfoApi())
    }
}

export const checkDeclare = () => {
    return (dispatch, getState) => {
        console.log('Dekat Action')
        dispatch(checkDeclareApi())
    }
}

export const checkDocument = () => {
    return (dispatch, getState) => {
        console.log('Dekat Action')
        dispatch(checkDocumentApi())
    }
}

export const checkContact = () => {
    return (dispatch, getState) => {
        console.log('Dekat Action')
        dispatch(checkContactApi())
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        //await dispatch({type:'SET_PERSONAL_INFO',payload:{status:'none'}})
        //await AsyncStorage.removeItem('status')
        //await AsyncStorage.removeItem('personalToken')
        console.log(`nak delete`)
        await SecureStore.deleteItemAsync('personalToken').then(console.log(`delete berjaya`)).catch(error => console.log(`tak berjaya : ${error}`))
        await SecureStore.deleteItemAsync('lmsPersonalToken').then(console.log(`delete berjaya`)).catch(error => console.log(`tak berjaya : ${error}`))

        dispatch({ type: 'REGISTRATION_RESET' })
        dispatch({ type: 'LOGIN_RESET' })
        dispatch({ type: 'COMPANY_INFO_RESET' })
        dispatch({ type: 'USER_PROFILE_RESET' })
        dispatch({ type: 'BIZ_INFO_RESET' })
        dispatch({ type: 'MERCHANT_RESET' })

        //dispatch({ type: 'ROOT_LOG_OUT' })
        //dispatch({ type: 'SET_LOGIN', payload: { proceed: false } })
    }
}


export const saveDocPic = (result, doc) => {
    console.log(`result yang mengasyikkan ${JSON.stringify(result)}`)
    const { uri } = result
    return async (dispatch, getState) => {
        const blob = await urlToBlob(uri)
        const { data } = blob

        const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        const params = {
            Body: blob,
            Bucket: `${config.bucketName}`,
            Key: fileName
        };
        // Sending the file to the Spaces
        s3.putObject(params)
            .on('build', request => {
                request.httpRequest.headers.Host = `${config.digitalOceanSpaces}`;
                request.httpRequest.headers['Content-Length'] = data.size;
                request.httpRequest.headers['Content-Type'] = data.type;
                request.httpRequest.headers['x-amz-acl'] = 'public-read';
            })
            .send((err) => {
                if (err) console.log(err);
                else {
                    // If there is no error updating the editor with the imageUrl
                    const imageUrl = `${config.digitalOceanSpaces}/` + fileName
                    console.log(imageUrl);
                    //dispatch({ type: 'SET_USER_PROFILE', payload: { profile_pic: imageUrl } })

                    switch (doc) {
                        case 'mykad':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument1: imageUrl, isDocument1fileName: fileName } });
                            break;
                        case 'company':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument2: imageUrl, isDocument2fileName: fileName } });
                            break;
                        case 'business':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument3: imageUrl, isDocument3fileName: fileName } });
                            break;

                    }

                    // dispatch({ type: 'SET_CONTACT_PERSON', payload: { ic_image: imageUrl, fileName } })
                    //dispatch(editUserApi())
                }
            });

    }
}


export const uploadPic = (uri, doc) => {
   // console.log(`result yang mengasyikkan ${JSON.stringify(result)}`)
    //const { uri } = result
    return async (dispatch, getState) => {
        const blob = await urlToBlob(uri)
        const { data } = blob

        const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        const params = {
            Body: blob,
            Bucket: `${config.bucketName}`,
            Key: fileName
        };
        // Sending the file to the Spaces
        s3.putObject(params)
            .on('build', request => {
                request.httpRequest.headers.Host = `${config.digitalOceanSpaces}`;
                request.httpRequest.headers['Content-Length'] = data.size;
                request.httpRequest.headers['Content-Type'] = data.type;
                request.httpRequest.headers['x-amz-acl'] = 'public-read';
            })
            .send((err) => {
                if (err) console.log(err);
                else {
                    // If there is no error updating the editor with the imageUrl
                    const imageUrl = `${config.digitalOceanSpaces}/` + fileName
                    console.log(imageUrl);
                    //dispatch({ type: 'SET_USER_PROFILE', payload: { profile_pic: imageUrl } })

                    switch (doc) {
                        case 'mykad':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument1: imageUrl } });
                            break;
                        case 'company':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument2: imageUrl } });
                            break;
                        case 'business':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument3: imageUrl } });
                            break;

                    }

                    // dispatch({ type: 'SET_CONTACT_PERSON', payload: { ic_image: imageUrl, fileName } })
                    //dispatch(editUserApi())
                }
            });

    }
}

export const saveDocPic1 = (result, doc) => {
    console.log(`result yang mengasyikkan ${JSON.stringify(result)}`)
    const { uri } = result
    return async (dispatch, getState) => {

        switch (doc) {
            case 'mykad':
                dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument1: uri, isDocument1fileName: 'NA' } });
                break;
            case 'company':
                dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument2: uri, isDocument2fileName: 'NA' } });
                break;
            case 'business':
                dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument3: uri, isDocument3fileName: 'NA' } });
                break;

        }


    }
}



export const saveDocumentDO = (result, doc) => {
    const { type, uri, name, size } = result
    return async (dispatch, getState) => {
        const blob = await urlToBlob(uri)
        const { data } = blob

        console.log(`blob ialah ${JSON.stringify(blob)}`)
        const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        const params = {
            Body: blob,
            Bucket: `${config.bucketName}`,
            Key: fileName
        };
        // Sending the file to the Spaces
        s3.putObject(params)
            .on('build', request => {
                request.httpRequest.headers.Host = `${config.digitalOceanSpaces}`;
                request.httpRequest.headers['Content-Length'] = data.size;
                request.httpRequest.headers['Content-Type'] = data.type;
                request.httpRequest.headers['x-amz-acl'] = 'public-read';
            })
            .send((err) => {
                if (err) console.log(err);
                else {
                    // If there is no error updating the editor with the imageUrl
                    const imageUrl = `${config.digitalOceanSpaces}/` + fileName
                    console.log(imageUrl, name);

                    switch (doc) {
                        case 'mykad':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument1: imageUrl, isDocument1fileName: fileName, docPicker: true } });
                            break;
                        case 'company':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument2: imageUrl, isDocument2fileName: fileName, docPicker: true } });
                            break;
                        case 'business':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument3: imageUrl, isDocument3fileName: fileName, docPicker: true } });
                            break;

                    }

                    //dispatch({ type: 'SET_CONTACT_PERSON', payload: { ic_image: imageUrl, fileName: name } })
                }
            });

    }
}


export const saveDocumentDO1 = (result, doc) => {
    const { type, uri, name, size } = result
    return async (dispatch, getState) => {
        const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        switch (doc) {
            case 'mykad':
                dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument1: uri, isDocument1fileName: fileName, docPicker: true } });
                break;
            case 'company':
                dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument2: uri, isDocument2fileName: fileName, docPicker: true } });
                break;
            case 'business':
                dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument3: uri, isDocument3fileName: fileName, docPicker: true } });
                break;

        }

    }
}