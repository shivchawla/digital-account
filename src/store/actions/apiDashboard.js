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
        loanList.reverse()
        console.log('Success loan list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_LOAN_LIST', payload: { loanList } })

      })
      .catch((error) => {
        console.log('Error initiating loan list info : ' + error);
      });

  }
}

export const repaymentListApi = () => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/repaymentinfo/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const repaymentList = responseJson.data
        repaymentList.reverse()
        console.log('Success repayment list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_LOAN_LIST', payload: { repaymentList } })

      })
      .catch((error) => {
        console.log('Error initiating loan list info : ' + error);
      });

  }
}


export const repaymentDetailApi = (id) => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    //repaymentinfo/details/?id=24
    fetch(`${apiUrl}api/repaymentinfo/details?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const repaymentDetail = responseJson.data
        console.log('Success withdraw data' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_LOAN_LIST', payload: { repaymentDetail } })

      })
      .catch((error) => {
        console.log('Error initiating withdraw data info : ' + error);
      });

  }
}

export const loanBillListApi = (loanNo) => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    //https://uat.niyo.my/api/repaymentinfo/bills/list?loanNo=199916920
    fetch(`${apiUrl}api/repaymentinfo/bills/list?loanNo=${loanNo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const loanBillList = responseJson.data
        //loanList.reverse()
        console.log('Loan Bill List' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_LOAN_BILL_LIST', payload: { loanBillList } })

      })
      .catch((error) => {
        console.log('Error initiating loan bill list info : ' + error);
      });

  }
}

export const billDetailApi = (id) => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/repaymentinfo/bills/details?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const billDetail = responseJson.data
        console.log('Success bill detail' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_LOAN_BILL_LIST', payload: { billDetail } })

      })
      .catch((error) => {
        console.log('Error initiating loan data info : ' + error);
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


export const withdrawDataApi = (id) => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/withdrawal/details?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const withdrawData = responseJson.data
        console.log('Success withdraw data' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_WITHDRAWAL_DATA', payload: { withdrawData } })

      })
      .catch((error) => {
        console.log('Error initiating withdraw data info : ' + error);
      });

  }
}

export const withdrawListApi = () => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/withdrawal/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const withdrawList = responseJson.data
        withdrawList.reverse()
        console.log('Success withdraw list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_WITHDRAWAL_LIST', payload: { withdrawList } })

      })
      .catch((error) => {
        console.log('Error initiating withdraw list info : ' + error);
      });

  }
}

export const vendorListApi = () => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setting/vendor/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const vendorList = responseJson.data
        vendorList.reverse()
        console.log('Success vendor list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_VENDOR_LIST', payload: { vendorList } })

      })
      .catch((error) => {
        console.log('Error initiating vendor list info : ' + error);
      });

  }
}

export const vendorDataRetrieveApi = (id) => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setting/vendor/details?id=${id}`, {
      method: 'GET',
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
        console.log('Error initiating vendor data info : ' + error);
      });

  }
}

export const withDrawApi = (values) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    //const values = getState().loanApplicationReducer

    const { amount,
      bankLabel,
      remark,
      bankAccountNo,
      bankAccountName,
      bankAddress,
      bankCountry } = values


    const account_no = bankAccountNo
    const account_name = bankAccountName
    const bank_name = bankLabel
    const bank_address = bankAddress
    const bank_country = bankCountry
    const amount_request = amount
    const amount_fee = 2
    const reason_request = remark




    const values2 = {
      account_no,
      account_name,
      bank_name,
      bank_address,
      bank_country,
      amount_request,
      amount_fee,
      reason_request,

    }


    const access_credential = 'api'
    console.log(`New loan api : ${JSON.stringify(values2)}`)

    fetch(`${apiUrl}/api/withdrawal/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...values2, access_credential }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        await dispatch({ type: 'SET_NEW_WITHDRAWAL', payload: { status, proceedMain: true } })
        await console.log(`withdrawal api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const customerListApi = () => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setting/customer/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const customerList = responseJson.data
        customerList.reverse()
        console.log('Success customer list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_CUSTOMER_LIST', payload: { customerList } })

      })
      .catch((error) => {
        console.log('Error initiating customer list info : ' + error);
      });

  }
}

export const customerDataRetrieveApi = (id) => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setting/customer/details?id=${id}`, {
      method: 'GET',
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

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setting/item/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const itemList = responseJson.data
        itemList.reverse()
        console.log('Success item list' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_ITEM_LIST', payload: { itemList } })

      })
      .catch((error) => {
        console.log('Error initiating item list info : ' + error);
      });

  }
}

export const itemDataRetrieveApi = (id) => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/setting/item/details?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const itemData = responseJson.data
        console.log('Success item data' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_ITEM_LIST', payload: { itemData } })

      })
      .catch((error) => {
        console.log('Error initiating item data info : ' + error);
      });

  }
}


export const getAllUsersApi = () => {
  return async (dispatch, getState) => {

    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/developer/merchants/account/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const {data} = responseJson
        const userList = data

        //withdrawList.reverse()
        console.log('Success all users list' + JSON.stringify(userList))
        dispatch({ type: 'SET_RECIPIENT_LIST', payload: { userList } })

      })
      .catch((error) => {
        console.log('Error initiating user list info : ' + error);
      });

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
        invoiceList.reverse()
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

        // const data = responseJson.data
        const { data } = responseJson
        const reportList = data
        // reportList.reverse()
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

    //const personalToken = await AsyncStorage.getItem('personalToken');
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)

    fetch(`${apiUrl}api/business/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token

      }

    }).then((response) => response.json())
      .then(async (responseJson) => {
        const businessDirectoryList = responseJson.data
        businessDirectoryList.reverse()
        console.log('Success' + JSON.stringify(responseJson))
        dispatch({ type: 'SET_BUSINESS_DIRECTORY_LIST', payload: { businessDirectoryList } })

      })
      .catch((error) => {
        console.log('Error initiating business dir info : ' + error);
      });

    // const businessDirectoryList = [{ name: 'Perusahaan Kecil Ah Kong Sdn. Bhd.', pNumber: 9780918, industry: 'Clothing', address: 'Jalan Bakri, 78099, Segamat, Johor Darul Tazim' },
    // { name: 'Perniagaan Abdul Wahub', pNumber: 6756781, industry: 'Service', address: '78, 88, Jalan Merlimau Jaya, Melaka' },
    // { name: 'StarBright Enterprise', pNumber: 956079, industry: 'Service', address: '78, Taman Lipat Kajang Perdana, Melaka' }]

    // dispatch({ type: 'SET_BUSINESS_DIRECTORY_LIST', payload: { businessDirectoryList } })
  }
}

export const retrieveMerchantInfoApi = () => {
  return async (dispatch, getState) => {

    try {
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

    } catch (err) {
      console.log(` masalah teragung merchant : ${JSON.stringify(err)}`)
    }
  }
}

export const retrieveAccountInfoApi = () => {
  return async (dispatch, getState) => {
    try {
      //const personalToken = await AsyncStorage.getItem('personalToken');
      const personalToken = await SecureStore.getItemAsync('personalToken')
      const { token_type, access_token } = JSON.parse(personalToken)

      fetch(`${apiUrl}api/account/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token_type + ' ' + access_token

        }

      }).then((response) => response.json())
        .then(async (responseJson) => {
          const accountInfo = responseJson.data
          console.log('account info ialah' + JSON.stringify(accountInfo[0]))
          dispatch({ type: 'SET_USER_PROFILE', payload: { ...accountInfo[0] } })

        })
        .catch((error) => {
          console.log('Error initiating account info : ' + error);
        });

    } catch (err) {
      console.log(` masalah teragung acc info : ${JSON.stringify(err)}`)
    }
  }
}

export const retrievePersonalInfoApi = () => {
  return async (dispatch, getState) => {
    try {
      //const personalToken = await AsyncStorage.getItem('personalToken');
      const personalToken = await SecureStore.getItemAsync('personalToken')
      const { token_type, access_token } = JSON.parse(personalToken)

      fetch(`${apiUrl}api/personal/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token_type + ' ' + access_token

        }

      }).then((response) => response.json())
        .then(async (responseJson) => {
          const accountInfo = responseJson.data
          console.log('personal info ialah' + JSON.stringify(accountInfo))
          //dispatch({ type: 'SET_USER_PROFILE', payload: { ...accountInfo[0] } })
          const {email,expo_token}=accountInfo
          dispatch({ type: 'SET_PERSONAL_INFO', payload: { ...accountInfo,server_expo_token:accountInfo.expo_token} })

        })
        .catch((error) => {
          console.log('Error initiating personal info : ' + error);
        });

    } catch (err) {
      console.log(` masalah teragung personal info : ${JSON.stringify(err)}`)
    }
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
        const test = responseJson
        console.log(`cdd result ialah ${JSON.stringify(test)}`)
        const status1 = test.status
        console.log(`status kejayaan : ${status1}`)
        if (status1 != 'Approved') {
          const { business_name, isDocument1, isDeclaration_one, status, contactId } = await getState().merchantInfoReducer
          //const contactId = await getState().merchantInfoReducer.id
          await console.log('Dekat setScreen action ', business_name, contactId, isDocument1, isDeclaration_one)
          if (business_name && contactId && (isDocument1 != 'http://test') && isDeclaration_one && (status == 'activated')) {
            // setLink('Dashboard')
            // setDashboardDisplay(true)
            const link = 'Dashboard'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('dashboard')
          } else if (business_name && contactId && (isDocument1 != 'http://test') && isDeclaration_one) {
            // setLink('Dashboard')
            // setDashboardDisplay(true)
            const link = 'AdminApproval'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('dashboard')
          } else if (business_name && contactId && (isDocument1 != null)) {
            //setLink('RegistrationDeclaration')
            const link = 'RegistrationDeclaration'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('go declaration')
          } else if (business_name && contactId) {
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
            const link = 'SignUpPersonalSuccess'
            dispatch({ type: 'SET_MERCHANT', payload: { link } })
            console.log('go company info')
          }
        } else {
          const link = 'Dashboard'
          dispatch({ type: 'SET_MERCHANT', payload: { link, status1 } })
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
        console.log(`cdd result ialah ${JSON.stringify(test)}`)
        const status1 = test.status
        console.log(`status kejayaan : ${status1}`)

        const link = 'Dashboard'
        dispatch({ type: 'SET_MERCHANT', payload: { link, status1 } })



      })
      .catch((error) => {
        console.log('Error initiating check contact : ' + error);
        dispatch({ type: 'SET_MERCHANT', payload: { status1: 'NA' } })
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
    try {
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
    catch (err) {
      console.log(` masalah teragung : ${JSON.stringify(err)}`)
    }

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

    fetch(`${apiUrl}/api/loan/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...values2, access_credential }),
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
        console.log(this.responseText);
        const { status } = JSON.parse(this.responseText)
        dispatch({ type: 'SET_INVOICE_APPLICATION', payload: { status, proceedMain: true } })

      }
    });

    xhr.open("POST", "https://uat.niyo.my/api/invoice/submit");
    xhr.setRequestHeader("Authorization", token_type + ' ' + access_token);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.setRequestHeader("Cache-Control", "no-cache");

    xhr.setRequestHeader("Host", "uat.niyo.my");
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");


    xhr.send(data);

  }
}



export const vendorDataApi = (values) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    //const values = getState().invoiceReducer
    const access_credential = 'api'
    console.log(`New add vendor api : ${JSON.stringify(values)}`)

    fetch(`${apiUrl}/api/setting/vendor/submit`, {
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
        await dispatch({ type: 'SET_VENDOR_SUBMIT', payload: { status, proceedMain: true } })
        await console.log(`vendor submit api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const customerDataApi = (values) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
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
        const { status } = await responseJson
        await dispatch({ type: 'SET_CUSTOMER_LIST', payload: { status, proceedMain: true } })
        await console.log(`customer submit api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}


export const itemDataApi = (values) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
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
        const { status } = await responseJson
        await dispatch({ type: 'SET_ITEM_LIST', payload: { status, proceedMain: true } })
        await console.log(`item submit api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const submitSupportApi = (values) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
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
        const { status } = await responseJson
        await dispatch({ type: 'SET_SUBMIT_SUPPORT', payload: { status, proceedMain: true } })
        await console.log(`support api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const newExpenseApi = (values) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    //const values = getState().expenseReducer
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
        const { status,code } = await responseJson
        await dispatch({ type: 'SET_NEW_EXPENSE', payload: { status,code,proceedMain: true } })
        await console.log(`expense api  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}


export const checkAuthApi = () => {
  return async (dispatch, getState) => {
    console.log(`lalu kat apidashboard checkauthapi`)
    const pinStringified = await SecureStore.getItemAsync('twoFa')
    console.log(`ada pin ${pinStringified}`)
    if (pinStringified) {
      console.log(`ada pin ${pinStringified}`)
      const pin = JSON.parse(pinStringified)
      dispatch({ type: 'SET_AUTH', payload: { ...pin } })
    }
  }
}

export const savePinApi = () => {
  return async (dispatch, getState) => {

    pinStringified = await JSON.stringify(getState().authReducer)
    console.log(JSON.stringify(getState().authReducer))
    await SecureStore.setItemAsync('twoFa', pinStringified);



  }
}





export const respondAgreementApi = (values) => {
  return async (dispatch, getState) => {
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
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
    const personalToken = await SecureStore.getItemAsync('personalToken')
    const { token_type, access_token } = JSON.parse(personalToken)
    const {expo_token} = getState().registrationReducer
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