import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

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
    brandPrimary: '#0080bb',
    brandPrimaryDark: '#004c6f',
    brandDanger: '#ff0033',
    borderColor: '#ddd',
  }
}

export default styleVariables