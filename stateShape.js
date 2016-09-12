stateShape = {
  auth: {
    currentUser: {
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
  events: [
    {
      keyId: 0,
      name: 'Example event',
      dateTime: '1473811200000',
      category: 1,
      creator: 2,
      partecipants: [
        2, 5, 6, 10
      ],
      shortPlace: 'Aci Catena',
      longPlace: 'Aci Catena, CT, Italia'
    }
  ],
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
  users: [
    { 
      keyId: 0,
      email: 'marco.nisi.100@gmail.com',
      firstName: 'Marco',
      lastName: 'Nisi',
      photoUrl: 'www.example.com/photo',
      /*friends: [
        2, 3, 4
      ],
      events: [
        0, 4, 5
      ]*/
    }
  ],
  categories: [
    {
      keyId: 0,
      name: 'Running',
      slug: 'running'
    }
  ]
}
