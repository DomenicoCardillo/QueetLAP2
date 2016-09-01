export const firebaseConfig = {
  apiKey        : 'AIzaSyA7xfi_HkGSSGYRsSZHoiqtRVt3G67KNA8',
  authDomain    : 'popping-inferno-7635.firebaseapp.com',
  databaseURL   : 'https://popping-inferno-7635.firebaseio.com/',
  storageBucket : 'popping-inferno-7635.appspot.com'
}

export const initialState = {
  auth: {
    currentUser: {
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
  }
}