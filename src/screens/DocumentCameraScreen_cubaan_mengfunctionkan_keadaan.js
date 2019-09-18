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

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles'

import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/action'

const DocumentCameraScreen = (props) => {

    const [hasCameraPermission, setCameraPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    const takePicture = async () => {
        const document = await this.camera.takePictureAsync();

        await this.props.saveDocPic(document)
        //await this.props.navigation.goBack()
        //console.log(`gambar ialah ${JSON.stringify(document)}`)


    }


    useEffect( () => {
        const { status } =  Permissions.askAsync(Permissions.CAMERA)

        setCameraPermission(status === 'granted')
    }, []);

    if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

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
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name={'ios-arrow-back'} size={48} color={'#ffffff'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#000000' }}>
                            <TouchableOpacity onPress={() => takePicture()}>
                                <View style={{ height: 44, width: 44, borderRadius: 22, backgroundColor: '#ffffff', alignSelf: 'center', margin: 10 }}></View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DocumentUpload')}>
                                <Text style={{ color: '#ffffff' }}>Browse File</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Camera>
        </View>
    );

}
////////////////////////////////////////////////////////////////////////

class DocumentCameraScreen1 extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = { hasCameraPermission: null, scanned: false }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
        //this.props.resetFulfillRequest()
    }



    async takePicture() {
        const document = await this.camera.takePictureAsync();

        await this.props.saveDocPic(document)
        await this.props.navigation.goBack()
        //console.log(`gambar ialah ${JSON.stringify(document)}`)


    }



    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

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
                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.goBack()}>
                                    <Ionicons name={'ios-arrow-back'} size={48} color={'#ffffff'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#000000' }}>
                                <TouchableOpacity onPress={() => this.takePicture()}>
                                    <View style={{ height: 44, width: 44, borderRadius: 22, backgroundColor: '#ffffff', alignSelf: 'center', margin: 10 }}></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DocumentUpload')}>
                                    <Text style={{ color: '#ffffff' }}>Browse File</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </Camera>
            </View>
        );
    }
}


DocumentCameraScreen.navigationOptions = { header: null, };

function mapStateToProps(state) {
    return {
        ic_image: state.companyInformationReducer.ic_image,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        saveDocPic: (doc) => dispatch(actionCreator.saveDocPic(doc)),
        saveDocumentDO: (result) => dispatch(actionCreator.saveDocumentDO(result))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentCameraScreen)