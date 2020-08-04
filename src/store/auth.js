import { firebase, db } from '../firebaseinit'
import { router } from '../router/router'

export default {
  namespaced: true,
  state: {
    user: null,
    // status: null,
    error: null,
    authenticated: false,
    loggedInUser: { uid: null, email: '', displayName: '' },
    loggingIn: false,
    signingUp: false,
  },
  getters: {
    user: state => state.user,
    authenticated: state => state.authenticated,
    loggedInUser: state => state.loggedInUser,
    loggingIn: state => state.loggingIn,
    signingUp: state => state.signingUp,
  },
  mutations: {
    //setUser: state => state.user = firebase.auth().currentUser,
    setUser: (state, payload) => state.user = payload,
    //removeUser: state => state.user = null,
    updateAuthenticated: (state, authenticated) => state.authenticated = authenticated,
    updateLoggedInUser: (state, user) => state.loggedInUser = user,
    updateLoggingIn: (state, status) => state.loggingIn = status,
    updateSigningUp: (state, status) => state.signingUp = status,
    // setStatus (state, payload) {
    //   state.status = payload
    // },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    updateAuthenticated: (context, authenticated) => context.commit('updateAuthenticated', authenticated),
    async authStateChangeHandler (context, user, payload) {
      console.log(user, 'user')
      console.log(payload, 'payload in if')
      if (user) {
        
        const userData = {
          uid: user.uid,
          email: user.email,
          //displayName: user.displayName,
          displayName: firebase.auth().currentUser.displayName,
        }
        console.log(userData, 'userData')

        context.commit('updateAuthenticated', true)
        context.commit('updateLoggedInUser', userData)
        //TODO: Should only send to dashboard if coming from 'home'
        router.push({ name: 'Dashboard' }).catch(error => {context.commit('setError', error.message)})
      } else {
        // User is signed out
        context.commit('updateAuthenticated', false)
        context.commit('updateLoggedInUser', { uid: null, email: null, displayName: null })
        router.push({ name: 'Home' }).catch(error => {context.commit('setError', error.message)})
      }
    },
    // signUpAction ( context, payload ) {
    //   context.commit('updateAuthenticated', 'loading')
    //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    //     .then((response) => {
    //       alert('success')
    //       // response will have user
    //       // user will have uid will be updated to the state
    //       context.commit('setUser', response.user.uid)
    //       context.commit('updateSigningUp', true)
    //       context.commit('updateAuthenticated', 'success')
    //       //return response.user
    //       response.user
    //       .updateProfile({
    //         displayName: payload.displayName
    //       }).then(() => {
    //         db.collection('users').add({
    //           displayName: payload.displayName,
    //           email: payload.email
    //         })
    //       })
    //     .catch((error) => {
    //       context.commit('updateSigningUp', false)
    //       context.commit('setError', error.message)
    //     })
    //   })
    //   return payload
    // },
    async signUpAction ( context, payload) {
      context.commit('updateAuthenticated', 'loading')
      const response = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);

      context.commit('setUser', response.user.uid)
      context.commit('updateSigningUp', true)
      context.commit('updateAuthenticated', 'success')

      await response.user.updateProfile({displayName: payload.displayName})
      await db.collection('users').add({displayName: payload.displayName, email: payload.email})
      // try {
      //   const response = firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
      //   context.commit('setUser', response.user.uid)
      //   context.commit('updateSigningUp', true)
      //   context.commit('updateAuthenticated', 'success')
      //   const updateName = response.user.updateProfile({displayName: payload.displayName});
      //   const updateDb = db.collection('users').add({displayName: payload.displayName, email: payload.email})

      //   payload = await Promise.all([response, updateName, updateDb])
      // } catch(error){
      //   context.commit('setError', error.message)
      //   context.commit('updateSigningUp', false)
      // }
      
      console.log('this is payload', payload)
      context.commit('updateLoggedInUser', payload);
      return payload
    },
    async signInAction ( context, data) {
      context.commit('updateLoggingIn', true)
      try {
        await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        //router.push({ name: 'Dashboard' })
      } catch(error)  {
          //context.commit('setStatus', 'failure')
          context.commit('setError', error.message)
          context.commit('updateLoggingIn', false)
      }
      // context.commit('updateLoggingIn', false)
    },
    async signOutAction(context){
      try{
        firebase.auth().signOut();

        context.commit('setUser', null);
        context.commit('updateAuthenticated', false);
        context.commit('updateLoggedInUser', null);
        // context.commit('setStatus', 'success');
        // context.commit('setError', null);

      } catch(error) {
        //context.commit('setStatus', 'failure');
        context.commit('setError', error.message)
      }
    },
  }
}