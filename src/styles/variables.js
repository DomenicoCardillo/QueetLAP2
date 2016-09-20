import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Palette http://colrd.com/palette/23519/
// #ea573d    #fbc063    #64b0bc    
// #446699    #555577    

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
    brandPrimary: '#446699',
    brandPrimaryDark: '#555577',
    brandDanger: '#ea573d',
    brandSuccess: '#2ecc71',
    borderColor: '#ddd',
  }
}

export default styleVariables