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
  RefreshControl
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  userBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    padding: 15,
    backgroundColor: '#fff'
  },
  userImage: {
    maxWidth: 40,
    maxHeight: 40,
    marginRight: 10,
    borderRadius: 20
  }
})

class UsersPage extends Component {
  constructor(props){
    super()
  }

  componentDidMount() {
    this.props.fetchUsers()
    this.props.listenUsersChanges()
  }

  renderRow(user) {
    user.firstname = user.firstname || 'Anonymus'
    return (
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.userBox}>
          <Image source={{uri: user.pictureUrl}} style={styles.userImage} />
          <Text style={{fontSize: 15, fontWeight: '500'}}>{user.firstname} {user.lastname}</Text>
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
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    )
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const dataSource = ds.cloneWithRows(this.props.users)
    return (
      <View style={[commonStyles.mainContainer, {backgroundColor: '#ea573d'}]}>
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
      </View>
    )
  }
}


export default UsersPage