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
    color: 'rgba(255,0,0,0.5)',
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
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 1,
    margin: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#808080',
  }
})