import React, {
  Component
} from 'react'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'

import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../styles/commons'
import styleVariables from '../styles/variables'
import fonts from '../styles/fonts'

export default class UserPage extends Component {
  constructor (props) {
    super()
  }

  render() {
    return (
      <View style={commonStyles.mainContainer}>
        <ScrollView style={commonStyles.container}>
          <View style={styles.imageContainer}>
            { this.props.user.pictureUrl === undefined || this.props.user.pictureUrl === '' ? (
                <Image source={require('../assets/img/user-default.png')} style={styles.userImage} />
              ) : (
                <Image source={{ uri: this.props.user.pictureUrl }} style={styles.userImage} />
              )
            }
          </View>
          <View style={styles.titleContainer}>
            <Text style={[fonts.style.h4, {marginRight: 8}]}>{this.props.user.firstname} {this.props.user.lastname}</Text>
            { this.props.user.gender === 'M' ? (
                <Icon name="mars" size={18} color="#3498db" style={{top: 8}} />
              ) : (
                <Icon name="venus" size={18} color="#ea4c89" style={{top: 8}} />
              )
            }
          </View>
          { this.props.user.longPlace ? (
            <View style={styles.infoContainer}>
              <Icon name="map-marker" size={20} color={styleVariables.colors.brandPrimary} style={styles.infoIcon} />
              <Text style={fonts.style.h5}>{this.props.user.longPlace}</Text>
            </View>
          ) : ( null ) }
          { this.props.user.stringedCategory ? (
            <View style={styles.infoContainer}>
              <Icon name="star" size={20} color={styleVariables.colors.brandPrimary} style={styles.infoIcon} />
              <Text style={fonts.style.h5}>{this.props.user.stringedCategory}</Text>
            </View>
          ) : ( null ) }

          { this.props.wathRender.addFriend ? (
            <Button 
              style={[commonStyles.primaryButton, {alignItems: 'center', marginTop: 20}]} 
              textStyle={commonStyles.primaryButtonText}
              onPress={() => this.props.toggleFriendship(this.props.user.id)}
              isLoading={this.props.isLoadingPrimary}>
              <Icon name="user-plus" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={commonStyles.primaryButtonText}>Add friend</Text>
            </Button>
          ) : ( null ) }
          { this.props.wathRender.removeFriend ? (
            <Button 
              style={[commonStyles.dangerButton, {alignItems: 'center', marginTop: 20}]}
              textStyle={commonStyles.primaryButtonText}
              onPress={() => this.props.toggleFriendship(this.props.user.id)}
              isLoading={this.props.isLoadingPrimary}>
              <Icon name="user-times" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={commonStyles.primaryButtonText}>Remove friend</Text>
            </Button>
          ) : ( null ) }
          { this.props.wathRender.waitResponse ? (
            <View style={commonStyles.rowCenter}>
              <Icon name="user" size={18} color={styleVariables.colors.brandPrimary} style={{marginRight: 8}} />
              <Text>Wait for his friendship response</Text>
            </View>
          ) : ( null ) }
          { this.props.wathRender.confirmFriend ? (
            <Button 
              style={[commonStyles.primaryButton, {alignItems: 'center'}]}
              textStyle={commonStyles.primaryButtonText}
              onPress={() => this.props.responseFriendship(this.props.user.id, true)}
              isLoading={this.props.isLoadingPrimary}>
              <Icon name="user-plus" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={commonStyles.primaryButtonText}>Confirm friendship</Text>
            </Button>
          ) : ( null ) }
          { this.props.wathRender.rejectFriend ? (
            <Button 
              style={[commonStyles.dangerButton, {alignItems: 'center', marginTop: 20}]} 
              textStyle={commonStyles.primaryButtonText}
              onPress={() => this.props.responseFriendship(this.props.user.id, false)}
              isLoading={this.props.isLoadingSecondary}>
              <Icon name="user-times" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={commonStyles.primaryButtonText}>Reject friendship</Text>
            </Button>
          ) : ( null ) }

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1, 
    alignItems: 'center'
  },
  titleContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 25
  },
  infoContainer: {
    flexDirection: 'row', 
    marginBottom: 20
  },
  infoIcon: {
    top: 3, 
    width: 20,
    marginRight: 8
  }
})