import Firebase from 'firebase'

export const firebaseConfig = {
  apiKey        : 'AIzaSyA7xfi_HkGSSGYRsSZHoiqtRVt3G67KNA8',
  authDomain    : 'popping-inferno-7635.firebaseapp.com',
  databaseURL   : 'https://popping-inferno-7635.firebaseio.com/',
  storageBucket : 'popping-inferno-7635.appspot.com'
}

export const initialState = {
  auth: {
    currentUser: {
      categories: []
    },
    signupPage: {
      isLoading: false,
      hasError: false,
      errorMessage: '',
      signupDone: false
    },
    loginPage: {
      isLoading: false,
      hasError: false,
      errorMessage: ''
    },
    forgotPasswordPage: {
      isLoading: false,
      hasError: false,
      errorMessage: '',
      sendDone: false
    }
  },
  profilePage: {
    isLoading: false,
    hasError: false,
    errorMessage: ''
  },
  eventPage: {
    isLoading: false,
    hasError: false,
    errorMessage: '',
    event: undefined
  },
  eventsPage: {
    isLoading: false,
    hasError: false,
    errorMessage: '',
    activeFilter: 'New'
  },
  myEventsPage: {
    isLoading: false,
    hasError: false,
    errorMessage: '',
    activeFilter: 'Ended'
  },
  usersPage: {
    isLoading: false,
    hasError: false,
    errorMessage: '',
    activeFilter: 'Friends'
  },
  userPage: {
    isLoadingPrimary: false,
    isLoadingSecondary: false,
    hasError: false,
    errorMessage: ''
  },
  categories: [],
  events: [],
  users: [],
  routes: {
    scene: null
  }
}

Firebase.initializeApp(firebaseConfig)

export const firebaseDB = Firebase.database()
export const dbUsersRef = firebaseDB.ref('users')
export const dbCategoriesRef = firebaseDB.ref('categories')
export const dbEventsRef = firebaseDB.ref('events')
export const firebaseAuth = Firebase.auth()
export const firebaseStorage = Firebase.storage()
export const userStorageRef = firebaseStorage.ref('users')
export const dbNotificationsRef = firebaseDB.ref('notifications')
export const serverEndpoint = 'http://queetlap2-tsks.rhcloud.com/'

export const formatDate = (date) => {
  date = new Date(date)
  let day = date.getDate() + ''
  let month = date.getMonth() + 1 + ''
  let year = date.getFullYear() + ''
  return year + '-' + (month.length == 2 ? month : '0'+month) + '-' + (day.length == 2 ? day : '0'+day)
}

export const formatTime = (time) => {
  time = new Date(time)
  let hours = time.getHours()+''
  let minutes = time.getMinutes()+''
  return (hours.length == 2 ? hours : '0'+hours) + ':' + (minutes.length == 2 ? minutes : '0'+minutes)
}

export const fromObjToArray = (obj) => {
  var array = [] 
  for(var o in obj) {
    obj[o].keyId = o
    array.push(obj[o])
  }
  return array
}

export const sortArrayByProps = (array, sortType, major) => {
  array.sort((a, b) => {
    if(sortType == 'asc') {
      if(a[major] < b[major]) return -1
      else if(a[major] > b[major]) return 1
      else return 0
    } else {
      if(a[major] > b[major]) return -1
      else if(a[major] < b[major]) return 1
      else return 0
    }
  })
}

export const filterByDateTime = (array, greater = true) => {
  return array.filter(el => 
    greater ? el.dateTime >= new Date().getTime() : el.dateTime <= new Date().getTime()
  )
}

export const filterByPlace = (array, place) => {
  return array.filter(el => el.shortPlace === place)
}

export const filterByCreator = (array, creatorId) => {
  return array.filter(el => el.creator.id === creatorId)
}

export const filterByCategory = (array, categoryId) => {
  return array.filter(el => el.category === categoryId)
}

export const findBy = (prop, value, array, onlyIndex = false) => {
  if(onlyIndex) return array.findIndex(x => x[prop] == value)
  else          return array[array.findIndex(x => x[prop] == value)]
}

export const filterByFriends = (array, me, inclusive) => {
  return array.filter(u => {
    let isMyFriend = u.friends && u.friends.hasOwnProperty(me.id) && me.friends && me.friends.hasOwnProperty(u.id)
    return inclusive ? isMyFriend : !isMyFriend
  })
}

export const filterByPartecipations = (array, userId) => {
  return array.filter(el => (el.users && el.users[userId] === true) || el.creator.id === userId)
}