import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { Constants } from 'expo'

const fontSize = 15

export default StyleSheet.create({
  text: {
    fontSize,
    fontFamily: 'Montserrat_light',
    color: '#055E7C'
  },
  title: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#055e7c',
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
    color: '#055E7C',
    fontSize: fontSize * 1.2
  },
  h2: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#055E7C',
    fontSize: fontSize * 1.3
  },
  h1: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#055E7C',
    fontSize: fontSize * 1.4
  },
  small: {
    fontSize,
    fontFamily: 'Montserrat_thin',
    color: '#055E7C',
    fontSize: fontSize * 0.8
  },
  error: {
    fontSize,
    fontFamily: 'Montserrat_thin',
    color: 'rgba(255,0,0,0.5)',
    fontSize: fontSize * 0.8
  }

})
