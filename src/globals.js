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
    signup: {
      isLoading: false,
      hasError: false,
      errorMessage: '',
      signupDone: false
    },
    login: {
      isLoading: false,
      hasError: false,
      errorMessage: ''
    },
    logout: {
      isLoading: false
    }
  },
  profile: {
    isLoading: false,
    hasError: false,
    errorMessage: ''
  },
  categories: [],
  event: {
    currentID: undefined,
    isLoading: false,
    hasError: false,
    errorMessage: ''
  },
  events: {}
}

Firebase.initializeApp(firebaseConfig)

export const firebaseDB = Firebase.database()
export const dbUsersRef = firebaseDB.ref('users')
export const dbCategoriesRef = firebaseDB.ref('categories')
export const dbEventsRef = firebaseDB.ref('events')
export const firebaseAuth = Firebase.auth()
export const firebaseStorage = Firebase.storage()
export const userStorageRef = firebaseStorage.ref('users')

export const formatDate = (date) => {
  date = new Date(date)
  let day = date.getDate() + ''
  let month = date.getMonth() + ''
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

export const sortArrayByPropsAsc = (array, major, minor) => {
  array.sort((a, b) => {
    if (a[major] < b[major])
      return -1
    else if (a[major] > b[major])
      return 1
    else {
      if (a[minor] < b[minor])
        return -1
      else if (a[minor] > b[minor])
        return 1
      else return 0
    }
  })
}