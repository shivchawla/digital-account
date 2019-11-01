import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as SecureStore from 'expo-secure-store'

import moment from 'moment'

const apiUrl = 'https://tuah.niyo.my/'

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

export const loanApplicationDataApi = (id) => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/loan/details?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const loanData = responseJson.data
        console.log('Success loan data' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_LOAN_DATA', payload: { loanData } })

      })
      .catch((error) => {
        console.log('Error initiating loan data info : ' + error);
      });

  }
}

export const loanListApi = () => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/loan/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const loanList = responseJson.data
        console.log('Success loan list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_LOAN_LIST', payload: { loanList } })

      })
      .catch((error) => {
        console.log('Error initiating loan list info : ' + error);
      });

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

export const invoiceListApi = () => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/invoices/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const invoiceList = responseJson.data
        console.log('Success invoice list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_INVOICE_LIST', payload: { invoiceList } })

      })
      .catch((error) => {
        console.log('Error initiating invoice list info : ' + error);
      });
    // const invoiceList = [{ ref: 112009, date: '12/3/2019', type: 'Item', currency: 'IDR' },
    // { ref: 112000, date: '13/3/2019', type: 'Item', currency: 'MYR' },
    // { ref: 112001, date: '14/3/2019', type: 'Item', currency: 'MYR' },
    // { ref: 112022, date: '14/3/2019', type: 'Item', currency: 'INR' },
    // { ref: 112023, date: '15/3/2019', type: 'Item', currency: 'SGD' }]

    // dispatch({ type: 'SET_INVOICE_LIST', payload: { invoiceList } })
  }
}

export const reportListApi = () => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { data } = responseJson.data
        const reportList = data
        console.log('Success report list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_REPORT_LIST', payload: { reportList } })

      })
      .catch((error) => {
        console.log('Error initiating report list info : ' + error);
      });
    // const reportList = [{ ref: 112005, date: '12/4/2019', type: 'Item', currency: 'IDR' },
    // { ref: 112004, date: '24/3/2019', type: 'Loan', currency: 'MYR' },
    // { ref: 112019, date: '20/5/2019', type: 'Withdrawal', currency: 'MYR' },
    // { ref: 112509, date: '11/6/2019', type: 'Disbursement', currency: 'INR' },
    // { ref: 112190, date: '12/7/2019', type: 'Loan', currency: 'SGD' }]

    //dispatch({ type: 'SET_REPORT_LIST', payload: { reportList } })
  }
}

export const businessDirectoryListApi = () => {
  return async (dispatch, getState) => {
    const businessDirectoryList = [{ name: 'Perusahaan Kecil Ah Kong Sdn. Bhd.', pNumber: 9780918, industry: 'Clothing', address: 'Jalan Bakri, 78099, Segamat, Johor Darul Tazim' },
    { name: 'Perniagaan Abdul Wahub', pNumber: 6756781, industry: 'Service', address: '78, 88, Jalan Merlimau Jaya, Melaka' },
    { name: 'StarBright Enterprise', pNumber: 956079, industry: 'Service', address: '78, Taman Lipat Kajang Perdana, Melaka' }]

    dispatch({ type: 'SET_BUSINESS_DIRECTORY_LIST', payload: { businessDirectoryList } })
  }
}

export const retrieveMerchantInfoApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setup/merchant`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const merchantInfo = responseJson.data
        console.log('Success' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_MERCHANT', payload: { ...merchantInfo } })

      })
      .catch((error) => {
        console.log('Error initiating merchant info : ' + error);
      });
  }
}

export const checkDeclareApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

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
        const isDeclaration_one = lastTest.isDeclaration_one
        console.log(`declaration paling last ialah ${isDeclaration_one}`)

        // const {isDeclaration_one} = responseJson.data[0]
        // console.log('Success business_declaration : ' + JSON.stringify(isDeclaration_one))
        dispatch({ type: 'SET_MERCHANT', payload: { isDeclaration_one } })

      })
      .catch((error) => {
        console.log('Error initiating merchant info : ' + error);
        dispatch({ type: 'SET_MERCHANT', payload: { isDeclaration_one: 0 } })
      });
  }
}

export const checkDocumentApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

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
        const isDocument1 = lastTest.isDocument1
        console.log(`document paling last ialah ${isDocument1}`)
        dispatch({ type: 'SET_MERCHANT', payload: { isDocument1 } })

      })
      .catch((error) => {
        console.log('Error initiating document info : ' + error);
        dispatch({ type: 'SET_MERCHANT', payload: { isDocument1: 'http://test' } })
      });
  }
}

export const checkContactApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

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

        const lastTest = test.slice(-1).pop()
        const full_name = lastTest.full_name
        console.log(`full_name paling last ialah ${full_name}`)
        dispatch({ type: 'SET_MERCHANT', payload: { full_name } })

      })
      .catch((error) => {
        console.log('Error initiating check contact : ' + error);
      });
  }
}

export const checkCDDApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setup/cdd_verification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const test = responseJson.data

        const { business_name, full_name, isDocument1, isDeclaration_one } = await getState().merchantInfoReducer
        await console.log('Dekat setScreen action ', business_name, full_name, isDocument1, isDeclaration_one)
        if (business_name && full_name && (isDocument1 != 'http://test') && isDeclaration_one) {
          // setLink('Dashboard')
          // setDashboardDisplay(true)
          const link = 'Dashboard'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('dashboard')
        } else if (business_name && full_name && (isDocument1 != 'http://test')) {
          //setLink('RegistrationDeclaration')
          const link = 'RegistrationDeclaration'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('go declaration')
        } else if (business_name && full_name) {
          //setLink('CompanyDocument')
          const link = 'CompanyDocument'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('go company document')
        } else if (business_name) {
          //setLink('ContactPerson')
          const link = 'ContactPerson'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('go contact person')
        } else {
          //setLink('CompanyInformation')
          const link = 'CompanyInformation'
          dispatch({ type: 'SET_MERCHANT', payload: { link } })
          console.log('go company info')
        }

      })
      .catch((error) => {
        console.log('Error initiating check contact : ' + error);
      });
  }
}

export const bankListApi = () => {
  return async (dispatch, getState) => {
    console.log(`bank list masuk api`)
    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const bankListStored = await AsyncStorage.getItem('bankListStored');
    const bankList = bankListStored && JSON.parse(bankListStored)
    //bankListStored && bankList.push(JSON.parse(bankListStored))
    //bankList.push(values)
    dispatch({ type: 'SET_BANK_LIST', payload: { bankList } })

    console.log(`bankList ialah : ${bankList}`)

  }
}

export const addBankApi = (values) => {
  return async (dispatch, getState) => {
    console.log(`add bank masuk api`)
    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')

    const bankListStored = await AsyncStorage.getItem('bankListStored');
    // bankListStored && bankList.push(JSON.parse(bankListStored))
    console.log(`bankListStored adalah : ${JSON.stringify(bankListStored)}`)
    if (bankListStored) {
      console.log(`local ada isi`)
      const bankList = JSON.parse(bankListStored)
      await AsyncStorage.setItem('bankListStored', JSON.stringify([...bankList, values]))
    } else {
      //console.log(`local kosong`)
      console.log(`local kosong : ${JSON.stringify(values)}`)
      AsyncStorage.setItem('bankListStored', JSON.stringify([values]))
    }

    // const { token_type, access_token } = JSON.parse(personalToken)


  }
}

export const deleteAllBankApi = (values) => {
  return async (dispatch, getState) => {
    console.log(`remove bank masuk api`)

    const personalToken = await SecureStore.getItemAsync('personalToken')

    AsyncStorage.removeItem('bankListStored')

    // const { token_type, access_token } = JSON.parse(personalToken)


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
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

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
}

export const notificationApi = () => {
  return async (dispatch, getState) => {

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

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
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const values = getState().loanApplicationReducer
    const access_credential = 'api'
    console.log(`New loan api : ${JSON.stringify(values)}`)

    fetch(`${apiUrl}/api/loan/submit`, {
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
        await dispatch({ type: 'SET_LOAN_APPLICATION', payload: { status, proceedMain: true } })
        await console.log(`loan api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const submitInvoiceApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const values = getState().invoiceReducer
    const access_credential = 'api'
    console.log(`New invoice api : ${JSON.stringify(values)}`)

    fetch(`${apiUrl}/api/invoice/submit`, {
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
        await dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { status, proceedMain: true } })
        await console.log(`invoice api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const submitSupportApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const values = getState().supportReducer
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
        const { status } = await responseJson
        await dispatch({ type: 'SET_SUBMIT_SUPPORT', payload: { status, proceedMain: true } })
        await console.log(`support api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const newExpenseApi = () => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const values = getState().expenseReducer
    const access_credential = 'api'
    console.log(`New expense api : ${JSON.stringify(values)}`)

    fetch(`${apiUrl}/api/expenses/transfer/submit`, {
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
        await dispatch({ type: 'SET_NEW_EXPENSE', payload: { status, proceedMain: true } })
        await console.log(`expense api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}