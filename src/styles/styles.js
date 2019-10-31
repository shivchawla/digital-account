import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { Constants } from 'expo'

const fontSize = 15

export default StyleSheet.create({
  text: {
    fontSize,
    fontFamily: 'Montserrat_light',
    color: '#000'
  },

  title: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#055E7C',
    fontSize: fontSize * 1.4
  },

  butang: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    fontSize: fontSize * 1.4
  },

  h3: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 1.1
  },

  h2: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#04A2BD',
    fontSize: fontSize * 1.3
  },

  h1: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 1.4
  },

  boldText: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize
  },

  small: {
    fontSize,
    fontFamily: 'Montserrat_regular',
    color: '#000',
    fontSize: fontSize * 0.9
  },

  titleBox: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 0.87
  },

  error: {
    fontSize,
    fontFamily: 'Montserrat_thin',
    color: 'rgba(255,0,0,1)',
    fontSize: fontSize * 0.8
  },

  screenMargin: {
    paddingLeft: 20,
    paddingRight: 20
  },

  formElement: {
    marginBottom: 20
  },

  titleMargin: {
    paddingLeft: 20,
    paddingRight: 20
  },

  box: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 6,
    margin: 10,
    padding: 15,
    // borderRadius: 15,
    // borderColor: '#000000',
    // borderWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  }
})