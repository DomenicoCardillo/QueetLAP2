import React, { Component } from 'react'

import styleVariables from '../styles/variables'
import commonStyles from '../styles/commons'
import fonts from '../styles/fonts'

import {
  View,
  ListView,
  Text, 
  Image, 
  StyleSheet,
  RecyclerViewBackedScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { SegmentedControls } from 'react-native-radio-buttons'

import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  userBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    padding: 15,
    backgroundColor: '#fff'
  },
  userImage: {
    width: 45,
    height: 45,
    marginRight: 15,
    borderRadius: 22.5
  }
})

class UsersPage extends Component {
  constructor(props){
    super()
  }

  componentDidMount() {
    this.setFilter('Friends')
    this.props.listenUsersChanges()
  }

  setFilter(selectedFilter) {
    this.props.setFilter(selectedFilter)
  }

  goToUserDetail(user) {
    this.props.setUserDetail(user)
  }

  renderRow(user) {
    user.firstname = user.firstname || user.email
    
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => this.goToUserDetail(user)}>
        <View style={styles.userBox}>
          { user.pictureUrl === undefined ? (
            <Image source={require('../assets/img/user-default.png')} style={styles.userImage} />
          ) : (
            <Image source={{uri: user.pictureUrl}} style={styles.userImage} />
          )}
          <Text style={{fontSize: 15, fontWeight: '500'}}>{user.firstname} {user.lastname}</Text>
          <Icon name="chevron-right" size={22} color="#999" style={{position: 'absolute', right: 20, top: 25}} />
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: '#ddd'
        }}
      />
    )
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const dataSource = ds.cloneWithRows(this.props.users)
    const options = [
      'Friends',
      'All'
    ]
    return (
      <View style={[commonStyles.mainContainer, {backgroundColor: styleVariables.colors.backgroundColor}]}>
        <View style={{paddingTop: 10, paddingBottom: 10}}>
          <SegmentedControls
            tint={styleVariables.colors.backgroundColor}
            selectedTint={'#fff'}
            backTint={'#fff'}
            optionStyle= {{
              fontSize: 17,
              width: styleVariables.screenWidth / 2 - 5
            }}
            containerStyle= {{
              marginRight: 10,
              marginLeft: 10,
              flex: 1,
              justifyContent: 'center',
            }}
            options={options}
            onSelection={this.setFilter.bind(this)}
            selectedOption={this.props.activeFilter}
          />
        </View>

        {this.props.isLoading && this.props.users.length === 0 ? (
            <ActivityIndicator
              animating={this.props.isLoading}
              style={{alignItems: 'center', justifyContent: 'center', height: styleVariables.screenHeight - (85 * 2)}}
              color="#fff"
              size="large"
            />
          ) : null
        }

        { !this.props.isLoading && this.props.users.length === 0 && this.props.activeFilter === 'Friends' ? (
            <View style={styles.errorBox}>
              <Text style={[fonts.style.h4, commonStyles.whiteText, {textAlign: 'center'}]}>You have no friends</Text>
              <TouchableOpacity onPress={this.setFilter.bind(this, 'All')}>
                <Text style={[fonts.style.h6, commonStyles.whiteText, {textAlign: 'center'}]}>See all users</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ListView
              dataSource={dataSource}
              renderRow={(user) => this.renderRow(user)}
              renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
              renderSeparator={this.renderSeparator}
              enableEmptySections={true}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.props.fetchUsers.bind(this)}
                  tintColor='#fff'
                  title="Loading..."
                  titleColor='#fff'
                  colors={['#555577', '#555577', '#fff']}
                  progressBackgroundColor="#fff"
                />
              }
            />
          )
        }
      </View>
    )
  }
}


export default UsersPage