import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as SecureStore from 'expo-secure-store'

import moment from 'moment'

const apiUrl = 'https://tuah.niyo.my/'

const apiGetCall = async (uri, apiAccess) => {
  console.log(`tengok uri ${uri}`)

  const access = apiAccess ? apiAccess : JSON.parse(await SecureStore.getItemAsync('personalToken'))

  const { token_type, access_token } = access
  const method = 'GET'
  const Accept = 'application/json'
  const Authorization = token_type + ' ' + access_token

  const headers = { 'Content-Type': 'application/json', Accept, Authorization }
  let response = await fetch(`${apiUrl}${uri}`, { method, headers })
  let responseJson = await response.json()
  return responseJson

}

const apiPostCall = async (uri, values, apiAccess) => {

  const body = JSON.stringify({ ...values, access_credential: 'api' })

  const access = apiAccess ? apiAccess : JSON.parse(await SecureStore.getItemAsync('personalToken'))

  const { token_type, access_token } = access
  const method = 'POST'
  const Accept = 'application/json'
  const Authorization = token_type + ' ' + access_token

  const headers = { 'Content-Type': 'application/json', Accept, Authorization }
  let response = await fetch(`${apiUrl}${uri}`, { method, headers, body })
  let responseJson = await response.json()
  return responseJson

}

////////////////////////////////////////////////////////////////////////////
//////////INI YANG LAMA PUNYA//////////////////////////////////////////////

export const notificationListApi = () => {
  return async (dispatch, getState) => {
    const notificationList = [{ status: 'Withdrawal', title: 'RM 50.00 was deducted', description: 'RM 50.00 was deducted from your account via withdrawal on 28 July 2019 at 17.28.' },
    { status: 'Transfer', title: 'RM80.00 was transferred', description: 'RM 80.00 was transfered from your account to Afi Hisam Maybank account on 25 July 2019 at 17.24.' },
    { status: 'Disbursement', title: 'RM 4952.00 disbursed', description: '1 July 2019 12.30. Disbursement Transfer for July is RM 4952.00' },
    { status: 'Transfer', title: 'RM 100.00 was transfered', description: 'RM 100.00 was transfered from your account to Aisya Ramli RHB Bank account on 25 June 2019 at 11.00.' },
    { status: 'Disbursement', title: 'RM 1067.00 disbursed', description: '1 June 2019 on 12.30. Disbursement Transfer for June is RM 1067.00.' }]

    dispatch({ type: 'SET_NOTIFICATION_LIST', payload: { notificationList } })
  }
}

export const paymentHistoryListApi = () => {
  return async (dispatch, getState) => {
    const paymentHistoryList = [{ ID: 'RP0002', Date: '20/03/19', Type: 'Auto', Amount: '122.60', Balance: '8000' },
    { ID: 'RP0003', Date: '20/03/19', Type: 'Manual', Amount: '1122.60', Balance: '9000' },
    { ID: 'RP0004', Date: '20/04/19', Type: 'Auto', Amount: '1022.60', Balance: '8009' }]

    dispatch({ type: 'SET_PAYMENT_HISTORY_LIST', payload: { paymentHistoryList } })
  }
}

export const loanApplicationDataApi = (id) => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/loan/details?id=${id}`, getState().apiReducer)
    const loanData = responseJson.data
    console.log('Success loan data' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_LOAN_DATA', payload: { loanData } })

  }
}

export const loanListApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/loan/list`, getState().apiReducer)
    const loanList = await responseJson.data
    loanList && loanList.reverse()
    dispatch({ type: 'SET_LOAN_LIST', payload: { loanList } })
  }
}

export const repaymentListApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/repaymentinfo/list`, getState().apiReducer)
    const repaymentList = await responseJson.data
    repaymentList && repaymentList.reverse()
    dispatch({ type: 'SET_LOAN_LIST', payload: { repaymentList } })

  }
}


export const repaymentDetailApi = (id) => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/repaymentinfo/details?id=${id}`, getState().apiReducer)
    const repaymentDetail = responseJson.data
    console.log('Success withdraw data' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_LOAN_LIST', payload: { repaymentDetail } })


  }
}

export const loanBillListApi = (loanNo) => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/repaymentinfo/bills/list?loanNo=${loanNo}`, getState().apiReducer)
    const loanBillList = responseJson.data
    //loanList.reverse()
    console.log('Loan Bill List' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_LOAN_BILL_LIST', payload: { loanBillList } })

  }
}

export const billDetailApi = (id) => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/repaymentinfo/bills/details?id=${id}`, getState().apiReducer)
    const billDetail = responseJson.data
    console.log('Success bill detail' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_LOAN_BILL_LIST', payload: { billDetail } })

  }
}

export const agingListApi = () => {
  return async (dispatch, getState) => {
    const agingList = [{ ref: 112009, date: '12/3/2019', type: 'Item', currency: 'IDR' },
    { ref: 112000, date: '13/3/2019', type: 'Item', currency: 'MYR' },
    { ref: 112001, date: '14/3/2019', type: 'Item', currency: 'MYR' },
    { ref: 112022, date: '14/3/2019', type: 'Item', currency: 'INR' },
    { ref: 112023, date: '15/3/2019', type: 'Item', currency: 'SGD' }]

    dispatch({ type: 'SET_AGING_LIST', payload: { agingList } })
  }
}


export const withdrawDataApi = (id) => {
  return async (dispatch, getState) => {
    console.log(`detail mantap${id}`)
    const responseJson = await apiGetCall(`api/withdrawal/details?id=${id}`, getState().apiReducer)
    const withdrawData = responseJson.data
    console.log('Success withdraw data' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_WITHDRAWAL_DATA', payload: { withdrawData } })


  }
}


export const withdrawListApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/withdrawal/list`, getState().apiReducer)
    const withdrawList = await responseJson.data
    withdrawList && withdrawList.reverse()
    dispatch({ type: 'SET_WITHDRAWAL_LIST', payload: { withdrawList } })
  }
}

export const vendorListApi = () => {
  return async (dispatch, getState) => {


    const responseJson = await apiGetCall(`api/setting/vendor/list`, getState().apiReducer)
    const vendorList = await responseJson.data
    vendorList && vendorList.reverse()
    dispatch({ type: 'SET_VENDOR_LIST', payload: { vendorList } })

  }
}

export const vendorDataRetrieveApi = (id) => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/setting/vendor/details?id=${id}`, getState().apiReducer)
    const vendorData = responseJson.data
    console.log('Success vendor data' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_VENDOR_LIST', payload: { vendorData } })

  }
}

export const withDrawApi = (values) => {
  return async (dispatch, getState) => {

    const { token_type, access_token } = getState().apiReducer
    //const values = getState().loanApplicationReducer
    console.log(`values yang gempak ialah ${JSON.stringify(values)}`)
    const { amount,
      bankLabel,
      bank_name,
      remark,
      account_no,

      bank_address,
      country,
      account_holder_name } = values


    const bank_account = account_no
    const bank_account_name = account_holder_name


    const bank_country = country


    const amount_request = amount
    const amount_fee = 2
    const reason_request = remark

    /*
    `bank_account_name`, =======

`bank_address`, ===========
`bank_country`, ============
    */

    const values2 = {
      bank_account: values.account_holder_name,
      bank_account_name: values.account_holder_name,
      account_name: values.account_holder_name,
      account_no,
      bank_name,
      bank_address,
      bank_country,
      amount_request,
      amount_fee,
      reason_request,

    }


    //const access_credential = 'api'
    console.log(`New loan api : ${JSON.stringify(values2)}`)


    const responseJson = await apiPostCall(`/api/withdrawal/submit`, values2, getState().apiReducer)
    const { status, code } = await responseJson
    await dispatch({ type: 'SET_NEW_WITHDRAWAL', payload: { status, code, proceedMain: true } })
    await console.log(`withdrawal api  ${JSON.stringify(responseJson)}`)




  }
}

export const customerListApi = () => {
  return async (dispatch, getState) => {
    const responseJson = await apiGetCall(`api/setting/customer/list`, getState().apiReducer)
    const customerList = await responseJson.data
    customerList && customerList.reverse()
    dispatch({ type: 'SET_CUSTOMER_LIST', payload: { customerList } })

  }
}

export const customerDataRetrieveApi = (id) => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/setting/customer/details?id=${id}`, getState().apiReducer)
    const customerData = responseJson.data
    console.log('Success customer data' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_CUSTOMER_LIST', payload: { customerData } })


  }
}


export const deleteCustomerApi = (id) => {
  return async (dispatch, getState) => {


    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/customer/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const customerData = responseJson.data
        console.log('Success customer data' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_CUSTOMER_LIST', payload: { customerData } })

      })
      .catch((error) => {
        console.log('Error initiating customer data info : ' + error);
      });

  }
}

export const itemListApi = () => {
  return async (dispatch, getState) => {


    const responseJson = await apiGetCall(`api/setting/item/list`, getState().apiReducer)
    const itemList = await responseJson.data
    itemList && itemList.reverse()
    dispatch({ type: 'SET_ITEM_LIST', payload: { itemList } })

  }
}

export const itemDataRetrieveApi = (id) => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/setting/item/details?id=${id}`, getState().apiReducer)
    const itemData = responseJson.data
    console.log('Success item data' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_ITEM_LIST', payload: { itemData } })


  }
}


export const getAllUsersApi = () => {
  return async (dispatch, getState) => {


    const responseJson = await apiGetCall(`api/developer/merchants/account/all`, getState().apiReducer)
    const userList = await responseJson.data

    dispatch({ type: 'SET_RECIPIENT_LIST', payload: { userList } })


  }
}


export const invoiceListApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/invoices/list`, getState().apiReducer)
    const invoiceList = await responseJson.data
    invoiceList && invoiceList.reverse()
    dispatch({ type: 'SET_INVOICE_LIST', payload: { invoiceList } })

  }
}

export const reportListApi = () => {
  return async (dispatch, getState) => {


    const responseJson = await apiGetCall(`api/transactions`, getState().apiReducer)
    const reportList = await responseJson.data
    dispatch({ type: 'SET_REPORT_LIST', payload: { reportList } })
  }
}

export const businessDirectoryListApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/business/list`, getState().apiReducer)
    const businessDirectoryList = await responseJson.data
    businessDirectoryList && businessDirectoryList.reverse()
    dispatch({ type: 'SET_BUSINESS_DIRECTORY_LIST', payload: { businessDirectoryList } })
  }
}

export const retrieveMerchantInfoApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/setup/merchant`, getState().apiReducer)
    const merchantInfo = responseJson.data
    console.log('Success' + JSON.stringify(responseJson))
    dispatch({ type: 'SET_MERCHANT', payload: { ...merchantInfo } })

  }
}

export const retrieveAccountInfoApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/account/info`, getState().apiReducer)
    const accountInfo = responseJson.data
    console.log('account info ialah' + JSON.stringify(accountInfo[0]))
    dispatch({ type: 'SET_USER_PROFILE', payload: { ...accountInfo[0] } })


  }
}

export const retrievePersonalInfoApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`api/personal/info`, getState().apiReducer)
    const accountInfo = responseJson.data
    console.log('personal info ialah' + JSON.stringify(accountInfo))
    //dispatch({ type: 'SET_USER_PROFILE', payload: { ...accountInfo[0] } })
    const { email, expo_token } = accountInfo
    dispatch({ type: 'SET_PERSONAL_INFO', payload: { ...accountInfo, server_expo_token: accountInfo.expo_token } })


  }
}

export const checkDeclareApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');

    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/setup/business_declaration`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = responseJson.data
        const lastTest = test.slice(-1).pop()
        const isDeclaration_one = lastTest.business_id
        console.log(`declaration paling last ialah ${isDeclaration_one}`)

        // const {isDeclaration_one} = responseJson.data[0]
        // console.log('Success business_declaration : ' + JSON.stringify(isDeclaration_one))
        dispatch({ type: 'SET_MERCHANT', payload: { isDeclaration_one } })

      })
      .catch((error) => {
        console.log('Error initiating merchant info : ' + error);
        dispatch({ type: 'SET_MERCHANT', payload: { isDeclaration_one: null } })
      });
  }
}

export const checkDocumentApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');

    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/setup/business_document`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = responseJson.data
        console.log(`nak tengok document ade ke tak? : ${JSON.stringify(responseJson)}`)
        const lastTest = test.slice(-1).pop()
        const isDocument1 = lastTest.business_id
        console.log(`document paling last ialah ${JSON.stringify(isDocument1)}`)
        dispatch({ type: 'SET_MERCHANT', payload: { isDocument1 } })

      })
      .catch((error) => {
        console.log('Error initiating document info : ' + error);
        dispatch({ type: 'SET_MERCHANT', payload: { isDocument1: null } })
      });
  }
}

export const checkContactApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');

    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/setup/business_contact`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = responseJson.data
        console.log(`inilah contact test : ${JSON.stringify(test)}`)
        const lastTest = test.slice(-1).pop()
        const { id } = lastTest
        console.log(`full_name paling last ialah ${id}`)
        dispatch({ type: 'SET_MERCHANT', payload: { contactId: id } })

      })
      .catch((error) => {
        console.log('Error initiating check contact : ' + error);
      });
  }
}

export const checkCDDApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');

    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/setup/cdd_verification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = await responseJson
        console.log(`cdd result ialah ${JSON.stringify(test)}`)
        const status1 = test.status
        console.log(`status kejayaan : ${status1}`)

        if (status1 === 'Approved') {
          console.log('Approved sudah')
          const link = 'Dashboard'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
        }
        else if (status1 === 'Pending Admin Approval') {
          console.log('go admin approval')
          const link = 'AdminApproval'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
        }
        else if (status1 === 'Pending Verification') {

        }
        else if (status1 === 'Pending Business Profile') {
          const link = 'CompanyInformation'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('go business profile')
        }
        else if (status1 === 'Pending Business Declaration') {
          const link = 'RegistrationDeclaration'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('go declaration')
        }
        else if (status1 === 'Pending Document Upload') {
          const link = 'CompanyDocument'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('go company document')
        }
        else if (status1 === 'Pending Business Contact') {
          //setLink('ContactPerson')
          const link = 'ContactPerson'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('go contact person')
        }




      })
      .catch((error) => {
        console.log('Error initiating check contact : ' + error);
      });
  }
}


export const checkCDDApi2 = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');

    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/setup/cdd_verification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = await responseJson.data
        console.log(`cdd result ialah ${JSON.stringify(responseJson)}`)
        const status1 = test.status
        console.log(`status kejayaan : ${status1}`)

        if (status1 === 'Approved') { 
          console.log('approved lagi sudah')
        const link = 'Dashboard'
        dispatch({ type: 'SET_MERCHANT', payload: { link,status1 } })}
        else if (status1 === 'Pending Admin Approval') {
          console.log('go admin approval')
          const link = 'AdminApproval'
          dispatch({ type: 'SET_MERCHANT', payload: { link, status1 } })
        }
        else if (status1 === 'Pending Verification') {

        }
        else if (status1 === 'Pending Business Profile') {
          const link = 'CompanyInformation'
          dispatch({ type: 'SET_MERCHANT', payload: { link, status1 } })
          console.log('go business profile')
        }
        else if (status1 === 'Pending Business Declaration') {
          const link = 'RegistrationDeclaration'
          dispatch({ type: 'SET_MERCHANT', payload: { link, status1 } })
          console.log('go declaration')
        }
        else if (status1 === 'Pending Business Documents') {
          const link = 'CompanyDocument'
          dispatch({ type: 'SET_MERCHANT', payload: { link, status1 } })
          console.log('go company document')
        }
        else if (status1 === 'Pending Business Contact') {
          //setLink('ContactPerson')
          const link = 'ContactPerson'
          dispatch({ type: 'SET_MERCHANT', payload: { link, status1 } })
          console.log('go contact person')
        }



      })
      .catch((error) => {
        console.log('Error initiating check contact : ' + error);
        dispatch({ type: 'SET_MERCHANT', payload: { status1: 'NA' } })
      });
  }
}

export const bankListApi = () => {
  return async (dispatch, getState) => {

    const responseJson = await apiGetCall(`/api/banks`, getState().apiReducer)
    const bankList = await responseJson.data
    dispatch({ type: 'SET_BANK_LIST', payload: { bankList } })

  }
}

export const addBankApi = (values) => {
  return async (dispatch, getState) => {


    const { bankAccountNo, bankAccountName, bankAddress, bankCountry, bankLabel } = values
    const account_no = bankAccountNo
    const account_holder_name = bankLabel
    const bank_name = bankAccountName
    const bank_address = bankAddress
    const bank_country = bankCountry
    const val = { account_no, account_holder_name, bank_name, bank_address, bank_country }


    const responseJson = await apiPostCall(`/api/banks`, val, getState().apiReducer)
    const { status, code } = await responseJson
    // await dispatch({ type: 'SET_VENDOR_SUBMIT', payload: { status, code, proceedMain: true } })
    // await console.log(`vendor submit api  ${JSON.stringify(responseJson)}`)


  }
}

export const deleteAllBankApi = (values) => {
  return async (dispatch, getState) => {
    console.log(`remove bank masuk api`)
    AsyncStorage.removeItem('bankListStored')

    // const { token_type, access_token } = getState().apiReducer


  }
}

export const deleteBankApi = (id) => {
  return async (dispatch, getState) => {
    console.log(`remove bank delete api : ${id}`)




    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/banks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        // const vendorData = responseJson.data
        console.log('Success vendor data' + JSON.stringify(responseJson))
        // dispatch({ type: 'SET_VENDOR_LIST', payload: { vendorData } })

      })
      .catch((error) => {
        console.log('Error delete : ' + error);
      });


  }
}

export const sendNotificationApi = (expo_token, id, title) => {
  return async (dispatch, getState) => {

    console.log(`kemantapan sejati ${expo_token} dan ${id} dan ${title}`)
    const expo_token_from = getState().registrationReducer.expo_token
    fetch(`https://exp.host/--/api/v2/push/send`, {
      method: 'POST',
      headers: {
        'host': 'exp.host',
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate',
        'content-type': 'application/json',
      }, body: JSON.stringify({ to: expo_token, title: 'BXcess Notification', body: 'None', data: { title, id, expo_token_from } }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`inilah response JSON sendNotification : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error sendNotification : ' + error);
      });
  }
}

//////////////////////////////////LUNAWALLET/////////////////////////////////////////

export const getUrl = (pic) => {
  var kucing = ''
  Storage.get(pic)
    .then(result => kucing = result)
    .catch(err => console.log('error : ' + err))
  return kucing
}

export const userInfo = () => {
  return async (dispatch, getState) => {
    //const personalToken = await AsyncStorage.getItem('personalToken');
    try {

      const { token_type, access_token } = getState().apiReducer

      fetch(`${apiUrl}api/userInfo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token_type + ' ' + access_token
        }
      }).then((response) => response.json())
        .then(async (responseJson) => {
          const selfieKey = await responseJson.data.filename_2
          var selfieUri = ''

          await Storage.get(selfieKey)
            .then(async result => {
              await dispatch({ type: 'SET_DASHBOARD', payload: { userInfo: { ...responseJson.data, ...{ selfieUri: result } } } })
            })
            .catch(err => console.log('error : ' + err))
        })
        .catch((error) => {
          console.log('Error initiating dashboard : ' + error);
        });
    }
    catch (err) {
      console.log(` masalah teragung : ${JSON.stringify(err)}`)
    }

  }
}

export const notificationApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');

    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/Notification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const notificationByDate = [...responseJson.data.promotion, ...responseJson.data.annoucement, ...responseJson.data.advertisement]
        dispatch({ type: 'SET_NOTIFICATION', payload: { notificationList: notificationByDate } })
      })
      .catch((error) => {
        console.log('Error initiating notification : ' + error);
      });
  }
}

/////////////////////////////

export const urlToBlob = (url) => {

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob'; // convert type
    xhr.send();
  })
}

export const uploadImage = async (fileName, blob, contentType) => {
  await Storage.put(fileName, blob, contentType).then(data => {
    //this.props.savePicture(data.key, kidId)
    console.log('save success')
    //this.props.navigation.goBack()
  })
    .catch(err => console.log(err))
}

export const pushNotification = (expoToken) => {
  return async (dispatch, getState) => {
    const data = { nama: 'Syahrizan' }
    const to = expoToken//android
    //const to = 'ExponentPushToken[XXMeNqKO_IQNthjQU8uxgO]'//iphone
    const title = 'test'
    const body = 'body'

    fetch(`https://exp.host/--/api/v2/push/send`, {
      method: 'POST',
      headers: {
        'host': 'exp.host',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'accept-encoding': 'gzip, deflate',
      },
      body: JSON.stringify({ data, to, title, body }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        await console.log(`pay request money : ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.log('Error request money : ' + error);
      });
  }
}

export const submitLoanApplicationApi = () => {
  return async (dispatch, getState) => {

    const { token_type, access_token } = getState().apiReducer
    const values = getState().loanApplicationReducer

    const { amount,
      purpose,
      smeConnected,
      capacity,
      name,
      myKad,
      relationship,
      personnelName,
      email,
      control,
      influence,
      internal,
      subsidiary,
      guaranteed,
      truth,
      declareName,
      declarePosition } = values



    const total_financing = amount
    const purpose_financing = purpose
    const cddChkFinancingDeclare1 = smeConnected
    const cddConCapacity1 = capacity
    const cddConName1 = name
    const cddConMykad1 = myKad
    const cddConRelation1 = relationship
    const cddConRelationName1 = personnelName
    const cddConRelationEmail1 = email
    const cddChkFinancingDeclare2 = control
    const cddChkFinancingDeclare3 = influence
    const cddChkFinancingDeclare4 = internal
    const cddChkFinancingDeclare5 = subsidiary
    const cddChkFinancingDeclare6 = guaranteed
    const cddChkAppDeclare1 = truth
    const cddAppDeclareName = declareName
    const cddAppDeclarePosition = declarePosition

    const values2 = {
      total_financing,
      purpose_financing,
      cddChkFinancingDeclare1,
      cddConCapacity1,
      cddConName1,
      cddConMykad1,
      cddConRelation1,
      cddConRelationName1,
      cddConRelationEmail1,
      cddChkFinancingDeclare2,
      cddChkFinancingDeclare3,
      cddChkFinancingDeclare4,
      cddChkFinancingDeclare5,
      cddChkFinancingDeclare6,
      cddChkAppDeclare1,
      cddAppDeclareName,
      cddAppDeclarePosition
    }


    const access_credential = 'api'
    console.log(`New loan api : ${JSON.stringify(values)}`)

    const responseJson = await apiPostCall(`/api/loan/submit`, values2, getState().apiReducer)
    const { status, code } = await responseJson
    await dispatch({ type: 'SET_LOAN_APPLICATION', payload: { status, code, proceedMain: true } })
    await console.log(`loan api  ${JSON.stringify(responseJson)}`)



  }
}

export const submitInvoiceApi = () => {
  return async (dispatch, getState) => {

    const { token_type, access_token } = getState().apiReducer
    const { newInvoice, items } = getState().invoiceReducer

    const strNewInvoice = []
    //newInvoice.map()
    for (var p in newInvoice) {
      if (newInvoice.hasOwnProperty(p)) {
        strNewInvoice.push(p + "=" + newInvoice[p])
      }
      //strNewInvoice.join("&")
    }

    var strItems = []
    items.map((c, i) => {
      strItems += `&invoice_item[${i}]=${c.invoice_item}`
      strItems += `&item[${i}]=${c.item}`
      strItems += `&quantity[${i}]=${c.quantity}`
      strItems += `&currencyItem[${i}]=${c.currencyItem}`
      strItems += `&priceItem[${i}]=${c.priceItem}`
    })

    const strTest = "access_credential=api&" + strNewInvoice + "&" + strItems
    //const strTest = 'dueDate=2020-4-11&invoiceNumber=Ddfg&amount=123&category=3&invoiceType=1&invoiceDate=2020-4-11&entityName=Sy&entityEmail=syahrizan.ali@gmail.com&entityPhone=123456789&entityAddress=Ssd&access_credential=api&entityId=14&currency=MYR&invoice_item[0]=Dd&item[0]=88&quantity[0]=13&currencyItem[0]=MYR&priceItem[0]=12'

    // const strNewInvoiceAndItems = strNewInvoice + strItems + ', "access_credential":"api"}'
    // const prms=new URLSearchParams(JSON.parse(strTest))
    // const encodePrms=encodeURIComponent(prms)

    // console.log(`inilah encoded Prms yang mantap : ${encodePrms}`)
    console.log(`inilah kemantapan sejati : ${strTest.replace(new RegExp("\\[", "g"), '%5B').replace(new RegExp("\\]", "g"), '%5D').replace(new RegExp(",", "g"), '&')}`)
    var data = strTest.replace(new RegExp("\\[", "g"), '%5B').replace(new RegExp("\\]", "g"), '%5D').replace(new RegExp(",", "g"), '&')
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log('hafizh power dan hensem', this.responseText);
        const { status, code } = JSON.parse(this.responseText)
        dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { status, code, proceedMain: true } })

      }
    });

    xhr.open("POST", "https://tuah.niyo.my/api/invoice/submit");
    xhr.setRequestHeader("Authorization", token_type + ' ' + access_token);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.setRequestHeader("Cache-Control", "no-cache");

    xhr.setRequestHeader("Host", "tuah.niyo.my");
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");


    xhr.send(data);

  }
}



export const vendorDataApi = (values) => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`/api/setting/vendor/submit`, values, getState().apiReducer)
    const { status, code } = await responseJson
    await dispatch({ type: 'SET_VENDOR_SUBMIT', payload: { status, code, proceedMain: true } })
    await console.log(`vendor submit api  ${JSON.stringify(responseJson)}`)

    console.log(`New add vendor api : ${JSON.stringify(values)}`)


  }
}


export const deleteVendorApi = (id) => {
  return async (dispatch, getState) => {


    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/vendor/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const vendorData = responseJson.data
        console.log('Success vendor data' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_VENDOR_LIST', payload: { vendorData } })

      })
      .catch((error) => {
        console.log('Error initiating customer data info : ' + error);
      });

  }
}

export const deleteItemApi = (id) => {
  return async (dispatch, getState) => {


    const { token_type, access_token } = getState().apiReducer

    fetch(`${apiUrl}api/item/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const itemData = responseJson.data
        console.log('Success vendor data' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_ITEM_LIST', payload: { itemData } })

      })
      .catch((error) => {
        console.log('Error initiating customer data info : ' + error);
      });

  }
}


export const customerDataApi = (values) => {
  return async (dispatch, getState) => {

    const { token_type, access_token } = getState().apiReducer
    //const values = getState().invoiceReducer
    const access_credential = 'api'
    console.log(`New add customer api : ${JSON.stringify(values)}`)

    fetch(`${apiUrl}/api/setting/customer/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...values, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status, code } = await responseJson
        await dispatch({ type: 'SET_CUSTOMER_LIST', payload: { status, code, proceedMain: true } })
        await console.log(`customer submit api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}


export const itemDataApi = (values) => {
  return async (dispatch, getState) => {

    const { token_type, access_token } = getState().apiReducer
    //const values = getState().invoiceReducer
    const access_credential = 'api'
    console.log(`New add item api : ${JSON.stringify(values)}`)

    fetch(`${apiUrl}/api/setting/item/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...values, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status, code } = await responseJson
        await dispatch({ type: 'SET_ITEM_LIST', payload: { status, code, proceedMain: true } })
        await console.log(`item submit api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const submitSupportApi = (values) => {
  return async (dispatch, getState) => {

    const { token_type, access_token } = getState().apiReducer
    //const values = getState().supportReducer
    const access_credential = 'api'
    console.log(`New support api : ${JSON.stringify(values)}`)

    fetch(`${apiUrl}/api/ticket/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...values, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status, code } = await responseJson
        await dispatch({ type: 'SET_SUBMIT_SUPPORT', payload: { status, code, proceedMain: true } })
        await console.log(`support api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const newExpenseApi = (values) => {
  return async (dispatch, getState) => {

    const responseJson = await apiPostCall(`/api/expenses/transfer/submit`, values, getState().apiReducer)
    const { status, code } = await responseJson
    await dispatch({ type: 'SET_NEW_EXPENSE', payload: { status, code, proceedMain: true } })
    await console.log(`expense api  ${JSON.stringify(responseJson)}`)

  }
}


export const checkAuthApi = () => {
  return async (dispatch, getState) => {

    console.log(`lalu kat apidashboard checkauthapi`)
    const responseJson = await apiGetCall(`api/settings/auth`, getState().apiReducer)
    const pin = await responseJson.data
    console.log(`ada pin ${JSON.stringify(responseJson)}`)
    dispatch({ type: 'SET_AUTH', payload: { ...pin } })

  }
}

export const savePinApi = (values) => {
  return async (dispatch, getState) => {
    //pinStringified = getState().authReducer
    // console.log(JSON.stringify(getState().authReducer))
    // await SecureStore.setItemAsync('twoFa', pinStringified);

    const { token_type, access_token } = getState().apiReducer
    //const values = getState().expenseReducer
    const access_credential = 'api'


    fetch(`${apiUrl}api/settings/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...values, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status, code } = await responseJson
        await dispatch({ type: 'SET_AUTH', payload: { ...responseJson.data } })
        await console.log(`set auth api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}





export const respondAgreementApi = (values) => {
  return async (dispatch, getState) => {

    const { token_type, access_token } = getState().apiReducer
    //const values = getState().invoiceReducer
    const access_credential = 'api'
    console.log(`Respond : ${JSON.stringify(values)}`)

    fetch(`${apiUrl}/api/repaymentinfo/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...values, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        //await dispatch({ type: 'SET_VENDOR_SUBMIT', payload: { status, proceedMain: true } })
        await console.log(`respondAgreementApi ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}


export const updateExpoTokenApi = () => {
  return async (dispatch, getState) => {

    const { token_type, access_token } = getState().apiReducer
    const { expo_token } = getState().registrationReducer
    const access_credential = 'api'
    console.log(`update expo token : ${JSON.stringify(expo_token)}`)

    fetch(`${apiUrl}/api/personal/token/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ expo_token, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        //await dispatch({ type: 'SET_VENDOR_SUBMIT', payload: { status, proceedMain: true } })
        await console.log(`expo token update ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}