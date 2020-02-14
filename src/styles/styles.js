import { StyleSheet } from 'react-native'

const fontSize = 15

const elevationShadowStyle=(elevation)=> {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}



export default StyleSheet.create({
  text: {
    fontSize:fontSize*1.1,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },
  listItem: {
    fontSize:fontSize*0.8,
    fontFamily: 'Montserrat_medium',
    color: 'darkgrey'
  },

  label: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: 'grey'
  },
  value: {
    fontSize:fontSize * 1.1,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },


  title: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#055E7C',
    fontSize: fontSize * 1.4
  },
  subTitle: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#055E7C',
    fontSize: fontSize * 1.2
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
    fontSize: fontSize *1.1
  },

  small: {
    fontSize,
    fontFamily: 'Montserrat_regular',
    color: '#000',
    fontSize: fontSize * 0.9
  },

  titleBox: {
    fontSize: fontSize * 0.87,
    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize,
  },
  textInput: {
    fontSize:fontSize*1.1,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },

  error: {
    fontSize,
    fontFamily: 'Montserrat_thin',
    color: 'rgba(255,0,0,1)',
    fontSize: fontSize * 0.9
  },
  textDefault:{
    fontSize,
    fontFamily:'Montserrat_medium',
    color:'#000'
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

  boxOld: {
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
  },
  box: {
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  
  
  },
  shadow: {
    ...elevationShadowStyle(5),
    backgroundColor: 'white' // It'll look weird without a background color!
  },
  borderStyleBase: {
    width: 45,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
})