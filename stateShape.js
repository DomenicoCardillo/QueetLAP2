stateShape = {
  auth: {
    currentUser: {
      email: 'marco.nisi.100@gmail.com',
      displayName: 'Marco Nisi',
      photoUrl: 'www.example.com/photo',
      token: 'xxx-xxx-xxx'
      //Save my friends and my events?
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
  events: {
    0: {
      name: 'Example event',
      date: '2016-10-01',
      time: '10:00',
      category: 1,
      description: 'Example description',
      creator: 2,
      partecipants: [
        2, 5, 6, 10
      ],
      place: 5,
      status: 'Live' //One of ['Future', 'Forthcoming', 'Live', 'Finished', 'Passed']
    }
  },
  users: {
    0: {
      email: 'marco.nisi.100@gmail.com',
      firstName: 'Marco',
      lastName: 'Nisi',
      photoUrl: 'www.example.com/photo',
      friends: [
        2, 3, 4
      ],
      events: [
        0, 4, 5
      ] //Ridondante
    }
  },
  places: {
    0: {
      name: 'Villa Acicatena',
      coordX: 'xxx',
      coordY: 'xxx'
    }
  },
  categories: {
    0: {
      name: 'Running',
      events: [
        0, 2, 10
      ] //Ridondante
    }
  }
}
