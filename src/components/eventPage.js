import React, {
  Component,
} from 'react'

import { 
  ScrollView, 
  View, 
  Text,
  Image,
  StyleSheet
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'
import Icon from 'react-native-vector-icons/FontAwesome'

import { formatDate, formatTime } from '../globals'

export default class EventPage extends Component {
  constructor(props) {
    super(props)
  }

  categoryImage() {
    let catSlug = this.props.categories[this.props.event.category].slug
    let imageBox = null

    switch (catSlug) {
      case 'badminton':
        imageBox = <Image source={require('../assets/img/badminton.jpg')} style={styles.image} />
        break
      case 'basket':
        imageBox = <Image source={require('../assets/img/basket.jpg')} style={styles.image} />
        break
      case 'running':
        imageBox = <Image source={require('../assets/img/running.jpg')} style={styles.image} />
        break
      case 'soccer':
        imageBox = <Image source={require('../assets/img/soccer.jpg')} style={styles.image} />
        break
      case 'tennis':
        imageBox = <Image source={require('../assets/img/tennis.jpg')} style={styles.image} />
        break
    }

    return imageBox
  }

  render() {
    return (
      <View style={commonStyles.mainContainer}>
        <ScrollView style={commonStyles.container}>
          <View style={styles.topInfoContainer}>
            <Text style={styles.topInfo}>{this.props.categories[this.props.event.category].name}</Text>
            <View style={styles.topInfoContainer}>
              <Icon name="map-marker" size={18} color={styleVariables.colors.brandPrimaryDark} style={{marginRight: 8}} />
              <Text style={styles.topInfo}>{this.props.event.shortPlace}</Text>
            </View> 
          </View>

          {this.categoryImage()}
          
          <View style={styles.infoContainer}>
            <Text style={fonts.style.h1}>{this.props.event.name}</Text>
            <Text style={{fontSize: 12}}>{formatDate(this.props.event.dateTime)} - {formatTime(this.props.event.dateTime)}</Text>
          </View>
          
          <View style={styles.listContainer}>
            <Text style={fonts.style.h6}>Elenco partecipanti:</Text>
            <Text>- Domenico</Text>
            <Text>- Marco</Text>
            <Text style={{fontWeight: '600'}}>- {this.props.event.creator.name} (Event Creator)</Text>
            <Text>- Domenico</Text>
            <Text>- Marco</Text>
          </View>

          <Button 
            style={[commonStyles.primaryButton, {marginBottom: 10}]} 
            textStyle={commonStyles.primaryButtonText}
            onPress={this.props.join}>
            Partecipa
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: styleVariables.screenWidth - 20,
    height: 200,
    borderRadius: styleVariables.baseRadius,
  },
  topInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  topInfo: {
    fontSize: 15,
    fontWeight: '600',
    color: styleVariables.colors.brandPrimaryDark
  },
  listContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 10,
  }
})