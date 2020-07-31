import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
// // import {store} from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  }
})
// import Vue from 'vue'
// import Vuex from 'vuex'
// import { firebase } from '../firebaseinit'
// import { router } from '../router/router'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//     auth
//   },
//   state: {
//     user: null,
//     // status: null,
//     error: null,
//     authenticated: false,
//     loggedInUser: { uid: null, email: null, displayName: null },
//     loggingIn: false,
//     signingUp: false,
//   },
//   getters: {
//     user (state) {
//       return state.user
//     },
//     // 
//     authenticated: state => state.authenticated,
//     loggedInUser: state => state.loggedInUser,
//     loggingIn: state => state.loggingIn,
//     signingUp: state => state.signingUp,
//   },
//   mutations: {
//     // setUser (state, payload) {
//     //   state.user = payload
//     // },
//     //setUser: state => state.user = firebase.auth().currentUser,
//     setUser: (state, payload) => state.user = payload,
//     //removeUser: state => state.user = null,
//     updateAuthenticated: (state, authenticated) => state.authenticated = authenticated,
//     updateLoggedInUser: (state, user) => state.loggedInUser = user,
//     updateLoggingIn: (state, status) => state.loggingIn = status,
//     updateSigningUp: (state, status) => state.signingUp = status,
//     // setStatus (state, payload) {
//     //   state.status = payload
//     // },
//     setError (state, payload) {
//       state.error = payload
//     }
//   },
//   actions: {
//     updateAuthenticated: (context, authenticated) => context.commit('updateAuthenticated', authenticated),
//     authStateChangeHandler: (context, user) => {
//       //let name, email, photoUrl, uid, emailVerified;
//       if (user != null) {
//         const userData = {
//           uid: user.uid, 
//           name: user.displayName,
//           email: user.email, 
//           photoUrl: user.photoURL,
//           emailVerified: user.emailVerified,
//         } 
//         console.log('what is the userData', userData);

//         user.providerData.forEach(function (profile) {
//           console.log("Sign-in provider: " + profile.providerId);
//           console.log("  Provider-specific UID: " + profile.uid);
//           console.log("  Name: " + profile.displayName);
//           console.log("  Email: " + profile.email);
//           console.log("  Photo URL: " + profile.photoURL);
//           console.log(profile);
//         });

//         context.commit('updateAuthenticated', true)
//         context.commit('updateLoggedInUser', userData)
//         //TODO: Should only send to dashboard if coming from 'home'
//         router.push({ name: 'Dashboard' })
//       } else {
//         // User is signed out
//         context.commit('updateAuthenticated', false)
//         context.commit('updateLoggedInUser', { uid: null, email: null, displayName: null })
//         router.push({ name: 'Home' })
//       }
//     },
//     signUpAction ( context, payload ) {
//       context.commit('updateAuthenticated', 'loading')
//       // const userData = {
//       //   email: userData.email,
//       //   password: userData.password,
//       //   displayName: userData.displayName
//       // };
      
//       firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
//         .then((response) => {
//           alert('success')
//           // response will have user
//           // user will have uid will be updated to the state
//           context.commit('setUser', response.user.uid)
//           context.commit('updateSigningUp', true)
//           context.commit('updateAuthenticated', 'success')
//           return response.user
//             .updateProfile({
//               displayName: response.displayName
//             })
//         })
//         .catch((error) => {
//           context.commit('updateSigningUp', false)
//           context.commit('setError', error.message)
//         })
//     },

//     async signInAction ( context, data) {
//       context.commit('updateLoggingIn', true)
//       try {
//         await firebase
//         .auth()
//         .signInWithEmailAndPassword(data.email, data.password)
//         //router.push({ name: 'Dashboard' })
//       } catch(error)  {
//           //context.commit('setStatus', 'failure')
//           context.commit('setError', error.message)
//           context.commit('updateLoggingIn', false)
//       }
//       // context.commit('updateLoggingIn', false)
//     },
//     async signOutAction(context){
//       try{
//         firebase.auth().signOut();

//         context.commit('setUser', null);
//         context.commit('updateAuthenticated', false);
//         context.commit('updateLoggedInUser', null);
//         // context.commit('setStatus', 'success');
//         // context.commit('setError', null);

//         //router.push({ name: 'Home'})
//       } catch(error) {
//         //context.commit('setStatus', 'failure');
//         context.commit('setError', error.message)
//       }
//     },
//   }
// })