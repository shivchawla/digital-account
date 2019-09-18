//console.ignoredYellowBox = ['Setting a timer']
import React, { useState, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

const DocumentCameraScreen = (props) => {
    const docPicker = useSelector(state => state.companyInformationReducer.docPicker, shallowEqual)
    const dispatch = useDispatch()
    const saveDocPic = (val,doc) => dispatch(actionCreator.saveDocPic(val,doc));
    const saveDocumentDO = (val,doc) => dispatch(actionCreator.saveDocumentDO(val,doc));
    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    const takePicture = async () => {
        const doc=props.navigation.getParam('doc')
        const document = await this.camera.takePictureAsync();
        await saveDocPic(document,doc)
        await props.navigation.goBack()
       
    }

    const pickDoc = () => {
        const doc=props.navigation.getParam('doc')
        DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: false })
            .then(result => {
                console.log(JSON.stringify(result))
                //this.props.saveDocument(result)
                saveDocumentDO(result,doc)
            })
    }

    const getPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        setCameraPermission(status === 'granted')
        // return status;
    }

    useEffect(() => {
        docPicker? props.navigation.navigate('CompanyDocument'):null
        getPermission()        
    }, [docPicker]);

    if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    // if(docPicker){
    //     props.navigation.navigate('CompanyDocument')
    // }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={[StyleSheet.absoluteFill]}
                type={Camera.Constants.Type.back}
                ratio={'16:9'}
                ref={ref => {
                    this.camera = ref;
                }}
            >
                <View style={{ position: 'absolute', height: Layout.window.height - Constants.statusBarHeight, width: Layout.window.width }}>
                    <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#000000', }}>
                        <Text style={[styles.textDefault, { color: '#ffffff' }]}>Position your document inside the box</Text>
                    </View>
                    <View style={{ flex: 9, alignSelf: 'stretch' }}>
                        <View style={{ flex: 1, alignSelf: 'stretch' }}>
                            <Image source={require('../assets/images/cardborder.png')} resizeMode={'cover'}
                                style={{ alignSelf: 'stretch', flex: 1, height: undefined, width: undefined }}
                            />
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#000000', flexDirection: 'row', flex: 1, padding: 5 }}>
                        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() =>props.navigation.goBack()}>
                                <Ionicons name={'ios-arrow-back'} size={48} color={'#ffffff'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#000000' }}>
                            <TouchableOpacity onPress={() => takePicture()}>
                                <View style={{ height: 44, width: 44, borderRadius: 22, backgroundColor: '#ffffff', alignSelf: 'center', margin: 10 }}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() =>pickDoc()}>
                                <Text style={{ color: '#ffffff' }}>Browse File</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Camera>
        </View>
    );
}

DocumentCameraScreen.navigationOptions = { header: null, };

export default DocumentCameraScreen