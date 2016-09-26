import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// OLD Palette http://colrd.com/palette/23519/
// #ea573d    #fbc063    #64b0bc    
// #446699    #555577    

// New Palette
// https://coolors.co/ffffff-f7f7f7-00a676-016fb9-004f7a

let styleVariables = {
  baseRadius: 4,
  marginHorizontal: 10,
  marginVertical: 10,
  baseSpacer: 10,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  },
  colors: {
    brandPrimary: '#016FB9',
    brandPrimaryDark: '#004F7A',
    brandDanger: '#DB5461',
    brandSuccess: '#2ecc71',
    borderColor: '#ddd',
    backgroundColorContainer: '#f7f7f7',
    backgroundColor: '#00A676'
  }
}

export default styleVariables