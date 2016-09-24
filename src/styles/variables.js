import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Palette http://colrd.com/palette/23519/
// #ea573d    #fbc063    #64b0bc    
// #446699    #555577    

// https://coolors.co/ff8360-7dce82-7be0ad-aee5d8-e7e5e5
// https://coolors.co/092327-0b5351-00a9a5-4e8098-90c2e7

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
    backgroundColor: '#64B0BC'
  }
}

export default styleVariables