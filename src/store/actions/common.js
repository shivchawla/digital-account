import * as SecureStore from 'expo-secure-store'

export const checkCodeApi = async (code) => {
    console.log(`code ialah ${code}`)
    console.log(`check code berjaya`)
    console.log(`lalu kat apidashboard checkauthapi`)
    const pinStringified = await SecureStore.getItemAsync('twoFa')
    console.log(`ada pin ${pinStringified}`)
    const pin = JSON.parse(pinStringified)
    return (code === pin.pin)
}