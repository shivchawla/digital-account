import * as SecureStore from 'expo-secure-store'

import Amplify, { Auth, Storage } from 'aws-amplify';
import aws_exports from '../../aws-exports';
Amplify.configure(aws_exports);///

import s3 from '../../do/DigitalOcean'
import config from '../../do/config'

import { requestToken, requestPersonalToken, urlToBlob, registerApi, companyInfoAPI, contactPersonAPI, submitDocApi, declarationApi, cddApi, resendVerificationApi } from './apiRegistration'
import { paymentHistoryListApi, retrieveMerchantInfoApi, checkDeclareApi, checkDocumentApi, checkContactApi, checkCDDApi, loanListApi, invoiceListApi, agingListApi, reportListApi, businessDirectoryListApi, invoiceApi, newExpenseApi, customerDataApi, itemDataApi, submitLoanApplicationApi, addBankApi, bankListApi, deleteAllBankApi, notificationListApi, loanApplicationDataApi, submitInvoiceApi, submitSupportApi, withDrawApi, withdrawListApi, vendorListApi, withdrawDataApi, vendorDataApi, vendorDataRetrieveApi, customerListApi, customerDataRetrieveApi, itemListApi, itemDataRetrieveApi, retrieveAccountInfoApi, getAllUsersApi, repaymentListApi, repaymentDetailApi, checkCDDApi2, loanBillListApi, billDetailApi, checkAuthApi, savePinApi, respondAgreementApi, retrievePersonalInfoApi, updateExpoTokenApi, deleteCustomerApi,deleteVendorApi,deleteItemApi,deleteBankApi ,validatePinApi} from './apiDashboard'
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
        //await dispatch(submitDocApi())
    }
}

export const submitDoc2 = () => {

    return async (dispatch, getState) => {
        //const { isDocument1, isDocument2, isDocument3 } = values
        // await dispatch(uploadPic(isDocument1, 'mykad'))
        // await dispatch(uploadPic(isDocument2, 'company'))
        // await dispatch(uploadPic(isDocument3, 'business'))
        await dispatch(submitDocApi())
    }
}

export const submitLoanApplication = () => {
    return (dispatch, getState) => {
        dispatch(submitLoanApplicationApi())
        dispatch(loanListApi())
    }
}

export const submitNewSupport = (values) => {
    return (dispatch, getState) => {
        dispatch(submitSupportApi(values))
    }
}

export const submitNewInvoice = () => {
    return (dispatch, getState) => {
        dispatch(submitInvoiceApi())
        dispatch(invoiceListApi())

    }
}

export const submitNewExpense = (values) => {
    return (dispatch, getState) => {
        dispatch(newExpenseApi(values))
        dispatch(retrieveAccountInfoApi())
        dispatch(reportListApi())

    }
}


export const getAllUsers = () => {
    return (dispatch, getState) => {
        dispatch(getAllUsersApi())
    }
}

// export const passInvoice = (values) => {
//     return (dispatch, getState) => {
//         console.log('Dekat retrieve invoice info action')
//         dispatch(invoiceApi(values))
//     }
// }


export const withDraw = (values) => {
    return (dispatch, getState) => {
        dispatch(withDrawApi(values))
        dispatch(retrieveAccountInfoApi())
        dispatch(withdrawListApi())
    }
}

export const setMarkers = (index) => {
    return (dispatch, getState) => {

        const { notificationList } = getState().notificationScreenReducer
        console.log(`notification list ialah : ${JSON.stringify(notificationList)}`)
        const newArr = []
        notificationList.map((i, n) => (n === index) ? newArr.push({ ...i, marker: true }) : newArr.push({ ...i, marker: false }))
        console.log(`new notification list ialah : ${JSON.stringify(newArr)}`)
        dispatch({ type: 'SET_NOTIFICATION_LIST', payload: { notificationList: newArr } })

    }
}

export const setMarkerPaymentHistory = (index) => {
    return (dispatch, getState) => {

        const { paymentHistoryList } = getState().paymentHistoryReducer
        console.log(`payment history list ialah : ${JSON.stringify(paymentHistoryList)}`)
        const newArr = []
        //paymentHistoryList.map((i, n) => (n === index) ? newArr.push({ ...i, marker: true }) : newArr.push({ ...i, marker: false }))
        paymentHistoryList.map((i, n) => {
            if (n === index) {
                i.marker ? newArr.push({ ...i, marker: false }) : newArr.push({ ...i, marker: true })
            } else {
                newArr.push({ ...i, marker: false })
            }
        }
        )



        console.log(`new notification list ialah : ${JSON.stringify(newArr)}`)
        dispatch({ type: 'SET_PAYMENT_HISTORY_LIST', payload: { paymentHistoryList: newArr } })

    }
}

export const setMarkerReportList = (index) => {
    return (dispatch, getState) => {

        const { reportList } = getState().reportReducer
        const newArr = []
        reportList.map((i, n) => (i.id === index) ? newArr.push({ ...i, marker: !i.marker }) : newArr.push({ ...i, marker: false }))
        dispatch({ type: 'SET_REPORT_LIST', payload: { reportList: newArr } })
    }
}

export const setMarkerAgingList = (index) => {
    return (dispatch, getState) => {

        const { agingList } = getState().agingReducer
        const newArr = []
        agingList.map((i, n) => (n === index) ? newArr.push({ ...i, marker: true }) : newArr.push({ ...i, marker: false }))
        dispatch({ type: 'SET_AGING_LIST', payload: { agingList: newArr } })
    }
}

export const setMarker = (index) => {
    return (dispatch, getState) => {

        const { invoiceList } = getState().invoiceReducer
        const newArr = []
        invoiceList.map((i, n) => (n === index) ? newArr.push({ ...i, marker: !i.marker }) : newArr.push({ ...i, marker: false }))
        dispatch({ type: 'SET_INVOICE_LIST', payload: { invoiceList: newArr } })
    }
}

export const setMarkerInvoiceItem = (index) => {
    return (dispatch, getState) => {

        const { items } = getState().invoiceReducer
        const newArr = []
        //items.map((i, n) => (n === index) ? newArr.push({ ...i, marker: true }) : newArr.push({ ...i, marker: false }))
        items.map((i, n) => {
            if (n === index) {
                i.marker ? newArr.push({ ...i, marker: false }) : newArr.push({ ...i, marker: true })
            } else {
                newArr.push({ ...i, marker: false })
            }
        }
        )
        dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { items: newArr } })
    }
}

export const setMarkerInvoiceReview = (index) => {
    return (dispatch, getState) => {

        const { items } = getState().invoiceReducer
        const newArr = []
        items.map((i, n) => (n === index) ? newArr.push({ ...i, marker: true }) : newArr.push({ ...i, marker: false }))
        dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { items: newArr } })
    }
}

export const setMarkerBankList = (index) => {
    return (dispatch, getState) => {

        const { bankList } = getState().bankListReducer
        const newArr = []
        bankList.map((i, n) => (n === index) ? newArr.push({ ...i, marker: true }) : newArr.push({ ...i, marker: false }))
        dispatch({ type: 'SET_BANK_LIST', payload: { bankList: newArr } })
    }
}

// export const passExpense = (values) => {
//     return (dispatch, getState) => {
//         console.log('Dekat retrieve expense info action')
//         dispatch(expenseApi(values))
//     }
// }

export const passSupport = (values) => {
    return (dispatch, getState) => {
        console.log('Dekat support info action')
        //dispatch(supportApi(values))
    }
}

export const passVendorData = (values) => {
    return (dispatch, getState) => {
        console.log('Dekat vendor info action')
        dispatch(vendorDataApi(values))
    }
}

export const deleteVendor = (id) => {
    return (dispatch, getState) => {
        console.log('Dekat vendor info action')
        dispatch(deleteVendorApi(id))
        dispatch(vendorListApi(id))
    }
}


export const passCustomerData = (values) => {
    return (dispatch, getState) => {
        console.log('Dekat customer info action')
        dispatch(customerDataApi(values))
    }
}

export const deleteCustomer = (id) => {
    return (dispatch, getState) => {
        console.log('Dekat customer info action')
        dispatch(deleteCustomerApi(id))
        dispatch(customerListApi(id))
    }
}



export const passItemData = (values) => {
    return (dispatch, getState) => {
        console.log('Dekat item info action')
        dispatch(itemDataApi(values))
    }
}


export const getItemList = () => {
    return (dispatch, getState) => {
        dispatch(itemListApi())

    }
}

export const getItemData = (id) => {

    return (dispatch, getState) => {
        dispatch(itemDataRetrieveApi(id))

    }
}

export const deleteItem = (id) => {
    return (dispatch, getState) => {
        console.log('Dekat item info action')
        dispatch(deleteItemApi(id))
        dispatch(itemListApi(id))
    }
}

export const declaration = (values) => {
    return async (dispatch, getState) => {
        await dispatch(declarationApi(values))
        await dispatch(cddApi())
    }
}

export const retrieveMerchantInfo = () => {
    return (dispatch, getState) => {
        console.log('Dekat retrieve merchant info action')
        dispatch(retrieveMerchantInfoApi())
    }
}

export const retrieveAccountInfo = () => {
    return (dispatch, getState) => {
        console.log('Dekat retrieve merchant info action')
        dispatch(retrieveAccountInfoApi())
    }
}

export const retrievePersonalInfo = () => {
    return (dispatch, getState) => {
        console.log('Dekat retrieve personal info action')
        dispatch(retrievePersonalInfoApi())
    }
}

// export const checkDeclare = () => {
//     return (dispatch, getState) => {
//         console.log('Dekat check declaration action')
//         dispatch(checkDeclareApi())
//     }
// }

// export const checkDocument = () => {
//     return (dispatch, getState) => {
//         console.log('Dekat checkDocument action')
//         dispatch(checkDocumentApi())
//     }
// }

// export const checkContact = () => {
//     return (dispatch, getState) => {
//         console.log('Dekat checkContact action')
//         dispatch(checkContactApi())
//     }
// }

// export const setScreen = () => {
//     return (dispatch, getState) => {
//         console.log('Dekat setScreen action')
//         dispatch(checkCDDApi())
//     }

// }

export const setScreen2 = () => {
    return async (dispatch, getState) => {       
        await dispatch(checkCDDApi2())
       
    }

}

export const resendVerification = () => {
    return (dispatch, getState) => {
        console.log(' resend verification action')
        dispatch(resendVerificationApi())
    }

}

export const logout = () => {
    return async (dispatch, getState) => {
        //await dispatch({type:'SET_PERSONAL_INFO',payload:{status:'none'}})
        //await AsyncStorage.removeItem('status')
        //await AsyncStorage.removeItem('personalToken')
        console.log(`nak delete`)
        await SecureStore.deleteItemAsync('personalToken').then(console.log(`delete berjaya`)).catch(error => console.log(`tak berjaya : ${error}`))
        //await SecureStore.deleteItemAsync('lmsPersonalToken').then(console.log(`delete berjaya`)).catch(error => console.log(`tak berjaya : ${error}`))

        await dispatch({ type: 'REGISTRATION_RESET' })
        await dispatch({ type: 'LOGIN_RESET' })
        await dispatch({ type: 'COMPANY_INFO_RESET' })
        await dispatch({ type: 'USER_PROFILE_RESET' })
        await dispatch({ type: 'BIZ_INFO_RESET' })
        await dispatch({ type: 'MERCHANT_RESET' })
        await dispatch({ type: 'API_RESET' })

        //dispatch({ type: 'ROOT_LOG_OUT' })
        await dispatch({ type: 'SET_LOGIN', payload: { proceed: false } })
    }
}


export const saveDocPic = (result, doc) => {
    console.log(`result yang mengasyikkan ${JSON.stringify(result)}`)
    const { uri } = result
    return (dispatch, getState) => {
        const blob = urlToBlob(uri)
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
            .send((err, data) => {
                if (err) console.log(err);
                else {
                    // If there is no error updating the editor with the imageUrl
                    console.log(`data ialah ${JSON.stringify(data)}`)
                    const imageUrl = `${config.digitalOceanSpaces}/` + fileName
                    console.log(imageUrl);
                    //dispatch({ type: 'SET_USER_PROFILE', payload: { profile_pic: imageUrl } })

                    switch (doc) {
                        case 'mykad':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument1file: imageUrl } });
                            break;
                        case 'company':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument2file: imageUrl } });
                            break;
                        case 'business':
                            dispatch({ type: 'SET_CONTACT_PERSON', payload: { isDocument3file: imageUrl } });
                            break;

                    }


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

export const getNotificationList = () => {

    return (dispatch, getState) => {
        dispatch(notificationListApi())

    }
}

export const getPaymentRecordList = () => {

    return (dispatch, getState) => {
        dispatch(paymentHistoryListApi())

    }
}

export const getLoanData = (id) => {

    return (dispatch, getState) => {
        dispatch(loanApplicationDataApi(id))

    }
}

export const getLoanList = () => {

    return (dispatch, getState) => {
        dispatch(loanListApi())
        dispatch({ type: 'RESET_EMAIL_VERIFIED', payload: { loanApproved: null, loanDisbursed: null, email: null } })


    }
}

export const getRepaymentList = () => {

    return (dispatch, getState) => {
        dispatch(repaymentListApi())

    }
}

export const getRepaymentDetail = (values) => {

    return (dispatch, getState) => {
        dispatch(repaymentDetailApi(values))

    }
}


export const getLoanBillList = (loanNo) => {

    return (dispatch, getState) => {
        dispatch(loanBillListApi(loanNo))

    }
}

export const getBillDetail = (id) => {

    return (dispatch, getState) => {
        dispatch(billDetailApi(id))

    }
}

export const getWithdrawData = (id) => {

    return (dispatch, getState) => {
        dispatch(withdrawDataApi(id))

    }
}

export const getVendorData = (id) => {

    return (dispatch, getState) => {
        dispatch(vendorDataRetrieveApi(id))

    }
}

export const getWithdrawList = () => {

    return (dispatch, getState) => {
        dispatch(withdrawListApi())
        dispatch({ type: 'RESET_EMAIL_VERIFIED', payload: { withdrawalsDisbursed: null, withdrawalsApproved: null, email: null } })

    }
}

export const getVendorList = () => {

    return (dispatch, getState) => {
        dispatch(vendorListApi())

    }
}

export const getCustomerList = () => {

    return (dispatch, getState) => {
        dispatch(customerListApi())

    }
}


export const getCustomerData = (id) => {

    return (dispatch, getState) => {
        dispatch(customerDataRetrieveApi(id))

    }
}

export const getAgingList = () => {

    return (dispatch, getState) => {
        dispatch(agingListApi())

    }
}

export const getInvoiceList = () => {

    return (dispatch, getState) => {
        dispatch(invoiceListApi())

    }
}

export const getReportList = () => {

    return (dispatch, getState) => {
        dispatch(reportListApi())
    }
}

export const getBusinessDirectoryList = () => {
    return (dispatch, getState) => {
        dispatch(businessDirectoryListApi())
    }
}

export const bankList = () => {
    return (dispatch, getState) => {
        dispatch(bankListApi())
    }
}

export const addBank = (values) => {
    return async (dispatch, getState) => {
        console.log(`add bank masuk action`)
        await dispatch(addBankApi(values))
        await dispatch(bankList(values))
    }
}

export const deleteAllBank = () => {
    return async (dispatch, getState) => {
        console.log(`delete action`)
        await dispatch(deleteAllBankApi())
        await dispatch(bankList())
    }
}

export const deleteBank = (id) => {
    return async (dispatch, getState) => {
        console.log(`delete action`)
        await dispatch(deleteBankApi(id))
        await dispatch(bankList())
    }
}

export const filterLoanList = (values) => {
    return async (dispatch, getState) => {
        console.log(`filter loan list action`)
        console.log(`filter loan list action : ${JSON.stringify(values)}`)
        //await dispatch(loanListApi())
        const { loanList } = getState().loanReducer
        //const newLoanList=_.filter(loanList, _.matches({ 'a': 4, 'c': 6 }));
        const { status, type } = values
        const filterParam = (status && type) ? { status, type } : status ? { status } : type ? { type } : null
        const newLoanList = _.filter(loanList, _.matches(filterParam));
        console.log(`new Loan List : ${JSON.stringify(newLoanList)}`)
        // await dispatch(deleteAllBankApi())
        // await dispatch(bankList())
        dispatch({ type: 'SET_LOAN_LIST', payload: { filteredLoanList: newLoanList, filterEnabled: true } })
    }
}

export const filterInvoicesList = (values) => {
    return async (dispatch, getState) => {
        console.log(`filter invoice list action`)
        console.log(`filter invoice list action : ${JSON.stringify(values)}`)
        const { invoiceList } = getState().invoiceReducer
        const { currency_code, status } = values
        const filterParam = (currency_code && status) ? { currency_code, status } : currency_code ? { currency_code } : status ? { status } : null
        const newInvoicesList = _.filter(invoiceList, _.matches(filterParam));
        console.log(`new invoice List : ${JSON.stringify(newInvoicesList)}`)
        dispatch({ type: 'SET_INVOICE_LIST', payload: { filterInvoicesList: newInvoicesList, filterEnabled: true } })
    }
}

export const filterReportList = (values) => {
    return async (dispatch, getState) => {
        console.log(`filter report list action`)
        console.log(`filter report list action : ${JSON.stringify(values)}`)
        const { reportList } = getState().reportReducer
        const { type, credit_debit } = values
        const filterParam = (type && credit_debit) ? { type, credit_debit } : type ? { type } : credit_debit ? { credit_debit } : null
        const newReportList = _.filter(reportList, _.matches(filterParam));
        console.log(`new report List : ${JSON.stringify(newReportList)}`)
        dispatch({ type: 'SET_REPORT_LIST', payload: { filterReportList: newReportList, filterEnabled: true } })
    }
}

export const filterWithdrawalList = (values) => {
    return async (dispatch, getState) => {
        console.log(`filter withdrawal list action`)
        console.log(`filter withdrawal list action : ${JSON.stringify(values)}`)
        const { withdrawList } = getState().withdrawReducer
        const { status, type } = values
        const filterParam = (status && type) ? { status, type } : status ? { status } : type ? { type } : null
        const newWithdrawalList = _.filter(withdrawList, _.matches(filterParam));
        console.log(`new withdrawal List : ${JSON.stringify(newWithdrawalList)}`)
        dispatch({ type: 'SET_WITHDRAWAL_LIST', payload: { filteredWithdrawList: newWithdrawalList, filterEnabled: true } })
    }
}

export const filterItemList = (values) => {
    return async (dispatch, getState) => {
        console.log(`filter item list action`)
        console.log(`filter item list action : ${JSON.stringify(values)}`)
        const { itemList } = getState().itemReducer
        const { name, brand } = values
        const filterParam = (name && brand) ? { name, brand } : name ? { name } : brand ? { brand } : null
        const newItemList = _.filter(itemList, _.matches(filterParam));
        console.log(`new item List : ${JSON.stringify(newItemList)}`)
        dispatch({ type: 'SET_ITEM_LIST', payload: { filteredItemList: newItemList, filterEnabled: true } })
    }
}

export const filterCustomerList = (values) => {
    return async (dispatch, getState) => {
        console.log(`filter customer list action`)
        console.log(`filter customer list action : ${JSON.stringify(values)}`)
        const { customerList } = getState().customerReducer
        const { currency, email } = values
        const filterParam = (currency && email) ? { currency, email } : currency ? { currency } : email ? { email } : null
        const newCustomerList = _.filter(customerList, _.matches(filterParam));
        console.log(`new customer List : ${JSON.stringify(newCustomerList)}`)
        dispatch({ type: 'SET_CUSTOMER_LIST', payload: { filteredCustomerList: newCustomerList, filterEnabled: true } })
    }
}

export const filterBusinessList = (values) => {
    return async (dispatch, getState) => {
        console.log(`filter business list action`)
        console.log(`filter business list action : ${JSON.stringify(values)}`)
        const { businessDirectoryList } = getState().businessDirectoryReducer
        const { industry, address } = values
        const filterParam = (industry && address) ? { industry, address } : industry ? { industry } : address ? { address } : null
        const newBusinessList = _.filter(businessDirectoryList, _.matches(filterParam));
        console.log(`new business List : ${JSON.stringify(newBusinessList)}`)
        dispatch({ type: 'SET_BUSINESS_DIRECTORY_LIST', payload: { filterBusinessList: newBusinessList, filterEnabled: true } })
    }
}


export const checkAuth = () => {
    return async (dispatch, getState) => {
        console.log(`lalu kat action checkauth`)
        dispatch(checkAuthApi())
    }
}

export const setAuth = (val) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_AUTH', payload: { ...val } })
        //dispatch(savePinApi())
    }
}

export const savePin = (val) => {
    return async (dispatch, getState) => {
        await dispatch({ type: 'SET_AUTH', payload: { ...val } })
        dispatch(savePinApi(val))
    }
}

export const updateExpoToken = () => {
    return async (dispatch, getState) => {

        dispatch(updateExpoTokenApi())
    }
}

export const respondAgreement = (answer) => {
    return async (dispatch, getState) => {
        console.log(`kat action respondagreement : ${JSON.stringify(answer)}`)
        dispatch(respondAgreementApi(answer))
    }
}


export const validatePin = (pin) => {
    return async (dispatch, getState) => {
        console.log(`kat action validate pin : ${JSON.stringify(answer)}`)
        dispatch(validatePinApi(pin))
    }
}
