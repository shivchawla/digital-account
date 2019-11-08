import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient'
import Layout from '../constants/Layout'
import styles from '../styles/styles'
import * as actionCreator from '../store/actions/action'

const DocumentUploadScreen = (props) => {
    const dispatch = useDispatch()
    const saveDocumentDO = (val) => dispatch(actionCreator.saveDocumentDO(val));
    const fileName = useSelector(state => state.companyInformationReducer.fileName, shallowEqual)
    const pickDoc = () => {
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false }).then(result => {
            console.log(JSON.stringify(result))
            saveDocumentDO(result)
        })
        console.log(`boleh patah balik ker ni?`)
        props.navigation.goBack()
    }

    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={{ alignSelf: 'stretch', borderWidth: 1, borderRadius: 15, borderColor: 'darkblue', margin: 10, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row' }}>
                {!fileName ? <Text style={[styles.caption, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>MyKad Scanned Copy</Text> :
                    <Text style={[styles.textDefault, { alignSelf: 'flex-start', textAlign: 'left', margin: 10, padding: 10 }]}>{fileName}</Text>}
                <TouchableOpacity onPress={() => pickDoc()} style={{ padding: 10, borderRadius: 5, justifyContent: 'center', backgroundColor: 'gainsboro', margin: 10 }}>
                    <Text style={[styles.caption, { color: '#000', fontSize: 10 }]}>Select</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', margin: 5 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                    <LinearGradient colors={['#4DCB3E', '#269B1D',]} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 15, justifyContent: 'center' }}>
                        <Text style={[styles.textDefault, { color: '#fff' }]}>Cancel</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('ContactPerson')} style={{ width: Layout.window.width * 0.3, paddingTop: 5, paddingBottom: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#5A647F' }} >
                    <Text style={[styles.textDefault, { color: '#fff' }]}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

DocumentUploadScreen.navigationOptions = {
    header: null,
};

export default DocumentUploadScreen