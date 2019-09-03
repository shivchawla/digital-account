import { StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import { Constants } from 'expo'

const fontSize = 16

export default StyleSheet.create({
  text: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },
  title: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#4D6BFA',
    fontSize: fontSize * 1.4
  },
  h3: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 1.2
  },
  h2: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 1.3
  },
  h1: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 1.4
  },
  small: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 0.8
  },
  error: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: 'rgba(255,0,0,0.5)',
    fontSize: fontSize * 0.8
  }

})
