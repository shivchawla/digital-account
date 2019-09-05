import { AsyncStorage, Platform } from 'react-native'
import { FileSystem, Notifications } from 'expo'
import * as SecureStore from 'expo-secure-store'
import moment from 'moment'


const apiUrl = 'https://staging.niyo.my/'


export const requestToken = () => {
  console.log('baca x ni')
  return (dispatch, getState) => {
    console.log('baca x ni - 2')
    fetch(`${apiUrl}oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id: '1', client_secret: 'F1LrzGH5gf3uFGdaDmH9P7ZalcxT3smo7fCP1vJO', grant_type: 'client_credentials' }),

    }).then((response) => response.json())
      .then(async (responseJson) => {

        const { token_type, access_token } = await responseJson
        await console.log(`token is ${JSON.stringify(responseJson)}`)
        //this.props.setToken({ token_type, access_token })
        await dispatch({ type: 'GET_TOKEN', payload: { ...responseJson } })

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}


export const registerApi = (token_type, access_token, name, email, password, password_confirmation, expo_token) => {
  return async (dispatch, getState) => {
    fetch(`${apiUrl}api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ name, email, password, password_confirmation, expo_token }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        await dispatch({ type: 'SET_REGISTER', payload: { status, proceed: true, indicator: false, email, password } })
        await console.log(`register  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}


export const requestPersonalToken = (screen, username, password) => {
  console.log(`kat api : ${username} dan ${password}`)
  return async (dispatch, getState) => {
    fetch(`${apiUrl}oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id: '2', client_secret: 'auBzKxkcb9V6LVevIkEqdxCYJVJFjY8HvvoVRn33', grant_type: 'password', username, password }),

    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(`personal token ialah : ${JSON.stringify(responseJson)}`)
        const { token_type, access_token } = responseJson
        //await AsyncStorage.setItem('personalToken',JSON.stringify(responseJson))  
        const stringifyJson = JSON.stringify(responseJson)
        SecureStore.setItemAsync('personalToken', stringifyJson);
        dispatch({ type: 'SET_REGISTER', payload: { access_token } });
        (screen == 'login' && access_token) ? dispatch({ type: 'SET_LOGIN', payload: { proceed: true, indicator: false } }) : dispatch({ type: 'SET_LOGIN', payload: { proceed: false, indicator: false, ...responseJson } })

      })
      .catch((error) => {
        console.error('Error : ' + error);
      });
  }
}



export const companyInfoAPI = () => {
  return async (dispatch, getState) => {
    // const personalToken = await SecureStore.getItemAsync('personalToken')
    // const { token_type, access_token } = JSON.parse(personalToken)

    const token_type = 'Bearer'
    const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ2MTdkZmFhMzYxZjE4YmNkNWYyYjdjMDk1YmUyNWVjNWI0NmI3YTFhYmRlNThlNGM5NmUzZTA0OTNiZjc4NzE1YjM2NzhjNWQzNmNkYzUzIn0.eyJhdWQiOiIyIiwianRpIjoiNDYxN2RmYWEzNjFmMThiY2Q1ZjJiN2MwOTViZTI1ZWM1YjQ2YjdhMWFiZGU1OGU0Yzk2ZTNlMDQ5M2JmNzg3MTViMzY3OGM1ZDM2Y2RjNTMiLCJpYXQiOjE1NjcwNjM4NjQsIm5iZiI6MTU2NzA2Mzg2NCwiZXhwIjoxNTY4MzU5ODYzLCJzdWIiOiIxNCIsInNjb3BlcyI6W119.bHgh5nnCdBWMi5XKo-zII48FjxlDwnYaUlmvd6-j3iMxs4lc-d0nQlZ0iQTX-J5pmVBYr_x9wicvF4cxQ_xdnQAwaUrpgJdwp_tr7biwWYeIPPsj0-50coRvx-onpIPOj7rUB5-8bt6bN6r1HxfNbnbeDCOwKAjCVagXZ7j3CWn3uXUJWkwQloYPmg77PEJtrPrbjuw0OaVFxWnqKXgRsCtd-3qZWbMR4tt28DQFoIdUiljo-bK87AW65xJAA95jgqPm7W3umNB4sdCJtoBv4NEIohhKLAQQPTqyvsy-efX1Z6vnyKvfO-c-ul6wD3PgutWmY5GWHvy-qAcJDVEhEtKWOOZRPIsk5x9q_71rIl9wP8GzRlHj6NUmbhnN-_5XWsXItXc-syOzZWZEu593dE2zpr2_KNQoq4qdl0cAPbZjcToijWcawBU2Qt4AyqVCx8cpAHzLlC6Ufd7xVh1ZJknZjjZI515YfWMQEy_wqoqJofoKKYTcTLuMGZPx3usmuUznmTfeXdvY1aCiBX-mNO0CuVhhtxrVlrJsuqBaHRRdyee3tGjWm-CM7L1odXsrHF2or5rqV2uqMpKzYhKGUPju6YcigSMLPkDqSzSyDjY6kA_wmXiZQ--tYCTW1m65HREsbGdJLd9ZVcSMw91mN1yyU7ivnVHI_koivda6Y2M'

    console.log(`Token Type : ${JSON.stringify(token_type)}`)
    console.log(`access_token : ${JSON.stringify(access_token)}`)
    console.log(`Company Registration : ${JSON.stringify(getState().companyInformationReducer)}`)
    const companyInfo = getState().companyInformationReducer
    const { comp_addr, comp_addr2, comp_city, comp_state, comp_postcode } = companyInfo

    const cddAddress = `${comp_addr}, ${comp_addr2}, ${comp_city}, ${comp_state}`

    fetch(`${apiUrl}api/setup/merchant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...companyInfo, cddAddress }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        await dispatch({ type: 'SET_COMPANY_INFO', payload: { status, proceedSubmit: true } })
        await console.log(`companyInfo  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}

export const contactPersonAPI = (values) => {
  return async (dispatch, getState) => {
    // const personalToken = await SecureStore.getItemAsync('personalToken')
    // const { token_type, access_token } = JSON.parse(personalToken)
    const token_type = 'Bearer'
    const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ2MTdkZmFhMzYxZjE4YmNkNWYyYjdjMDk1YmUyNWVjNWI0NmI3YTFhYmRlNThlNGM5NmUzZTA0OTNiZjc4NzE1YjM2NzhjNWQzNmNkYzUzIn0.eyJhdWQiOiIyIiwianRpIjoiNDYxN2RmYWEzNjFmMThiY2Q1ZjJiN2MwOTViZTI1ZWM1YjQ2YjdhMWFiZGU1OGU0Yzk2ZTNlMDQ5M2JmNzg3MTViMzY3OGM1ZDM2Y2RjNTMiLCJpYXQiOjE1NjcwNjM4NjQsIm5iZiI6MTU2NzA2Mzg2NCwiZXhwIjoxNTY4MzU5ODYzLCJzdWIiOiIxNCIsInNjb3BlcyI6W119.bHgh5nnCdBWMi5XKo-zII48FjxlDwnYaUlmvd6-j3iMxs4lc-d0nQlZ0iQTX-J5pmVBYr_x9wicvF4cxQ_xdnQAwaUrpgJdwp_tr7biwWYeIPPsj0-50coRvx-onpIPOj7rUB5-8bt6bN6r1HxfNbnbeDCOwKAjCVagXZ7j3CWn3uXUJWkwQloYPmg77PEJtrPrbjuw0OaVFxWnqKXgRsCtd-3qZWbMR4tt28DQFoIdUiljo-bK87AW65xJAA95jgqPm7W3umNB4sdCJtoBv4NEIohhKLAQQPTqyvsy-efX1Z6vnyKvfO-c-ul6wD3PgutWmY5GWHvy-qAcJDVEhEtKWOOZRPIsk5x9q_71rIl9wP8GzRlHj6NUmbhnN-_5XWsXItXc-syOzZWZEu593dE2zpr2_KNQoq4qdl0cAPbZjcToijWcawBU2Qt4AyqVCx8cpAHzLlC6Ufd7xVh1ZJknZjjZI515YfWMQEy_wqoqJofoKKYTcTLuMGZPx3usmuUznmTfeXdvY1aCiBX-mNO0CuVhhtxrVlrJsuqBaHRRdyee3tGjWm-CM7L1odXsrHF2or5rqV2uqMpKzYhKGUPju6YcigSMLPkDqSzSyDjY6kA_wmXiZQ--tYCTW1m65HREsbGdJLd9ZVcSMw91mN1yyU7ivnVHI_koivda6Y2M'



    console.log(`Company Registration : ${JSON.stringify(getState().companyInformationReducer)}`)
    const { full_name, ic_no, phone, ic_image, position } = getState().companyInformationReducer
    //const comp_regdate=moment(companyInfo.comp_regdate).format("YYYY-MM-DD HH:mm:ss")
    fetch(`${apiUrl}api/setup/business_contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token_type + ' ' + access_token
      },
      body: JSON.stringify({ ...values }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { status } = await responseJson
        await dispatch({ type: 'SET_COMPANY_INFO', payload: { status, proceedMain: true } })
        await console.log(`companyInfo  ${JSON.stringify(responseJson)}`)
      })
      .catch((error) => {
        console.error('Error : ' + error);
      });

  }
}



/////////////////////////////////////////////////////////

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