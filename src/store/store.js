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

// import { firebase, db } from '../firebaseinit'
// import { router } from '../router/router'

// export default {
//   strict: true,
//   namespaced: true,
//   state: {
//     user: null,
//     // status: null,
//     error: null,
//     authenticated: false,
//     loggedInUser: { uid: null, email: '', displayName: '' },
//     loggingIn: false,
//     signingUp: false,
//     notifications: []
//   },
//   getters: {
//     user: state => state.user,
//     error: state => state.error,
//     authenticated: state => state.authenticated,
//     loggedInUser: state => state.loggedInUser,
//     loggingIn: state => state.loggingIn,
//     signingUp: state => state.signingUp,
//   },
//   mutations: {
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
//     pushNotification: (state, notification) => {
//       state.notifications.push({
//           ...notification,
//           id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
//       })
//     },
//     removeNotification: (state, notificationToRemove) => {
//       state.notifications = state.notifications.filter(notification => {
//           return notification.id != notificationToRemove.id;
//       })
//     },
//     setError: (state, payload) => state.error = payload,
//   },
//   actions: {
//     addNotification: (context, notification) => context.commit('pushNotification', notification),
//     removeNotification: (context, notification) => context.commit('removeNotification', notification),
//     updateAuthenticated: (context, authenticated) => context.commit('updateAuthenticated', authenticated),
//     async authStateChangeHandler (context, user) {
//       // let currentUser = firebase.auth().currentUser;
//       // console.log(currentUser, 'currentUser')
//       if (user) {

//         const userData = {
//           uid: user.uid,
//           email: user.email,
//           displayName: user.displayName,
//           photo: user.photoURL,
//           providerData: user.providerData,
//           // providerData: user.providerData[0].providerId
//           //displayName: firebase.auth().currentUser.displayName,
//         }
//         // .then(() => {
//           // db.collection('users').update({
//           //   uid: user.uid,
//           //   email: user.email,
//           //   displayName: user.displayName,
//           //   photo: user.photoURL,
//           //   providerData: user.providerData,
//           // })
//         // })
        
//         // console.log(user, 'user console log')
//         console.log(userData, 'userData')

//         context.commit('updateAuthenticated', true)
//         context.commit('updateLoggedInUser', userData)
//         //TODO: Should only send to dashboard if coming from 'home'
//         router.push({ name: 'Dashboard' }).catch(error => {context.commit('setError', error)})
//       } else {
//         // User is signed out
//         context.commit('updateAuthenticated', false)
//         context.commit('updateLoggedInUser', { uid: null, email: null, displayName: null })
//         router.push({ name: 'Home' }).catch(error => {context.commit('setError', error)})
//       }
//     },
//     // signUpAction ( context, payload ) {
//     //   context.commit('updateAuthenticated', 'loading')
//     //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
//     //     .then((response) => {
//     //       alert('success')
//     //       // response will have user
//     //       // user will have uid will be updated to the state
//     //       context.commit('setUser', response.user.uid)
//     //       context.commit('updateSigningUp', true)
//     //       context.commit('updateAuthenticated', 'success')
//     //       //return response.user
//     //       response.user
//     //       .updateProfile({
//     //         displayName: payload.displayName
//     //       }).then(() => {
//     //         db.collection('users').add({
//     //           displayName: payload.displayName,
//     //           email: payload.email
//     //         })
//     //       })
//     //     .catch((error) => {
//     //       context.commit('updateSigningUp', false)
//     //       context.commit('setError', error.message)
//     //     })
//     //   })
//     //   return payload
//     // },
//     async signUpAction ( context, payload, error){
//       context.commit('updateAuthenticated', 'loading')
//       const response = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);

//       context.commit('setUser', response.user.uid)
//       context.commit('updateSigningUp', true)
//       context.commit('updateAuthenticated', 'success')

//       await response.user.updateProfile({displayName: payload.displayName})
//       await db.collection('users').add({displayName: payload.displayName, email: payload.email})
//       // try {
//       //   const response = firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
//       //   context.commit('setUser', response.user.uid)
//       //   context.commit('updateSigningUp', true)
//       //   context.commit('updateAuthenticated', 'success')
//       //   const updateName = response.user.updateProfile({displayName: payload.displayName});
//       //   const updateDb = db.collection('users').add({displayName: payload.displayName, email: payload.email})

//       //   payload = await Promise.all([response, updateName, updateDb])
//       // } catch(error){
//       //   context.commit('setError', error.message)
//       //   context.commit('updateSigningUp', false)
//       // }
      
//       // console.log('this is payload', payload)
//       context.commit('updateLoggedInUser', payload)
//       context.commit('setError', error.message)
//       return payload
//     },
//     async signInAction (context, data){
//       context.commit('updateLoggingIn', true)
//       try {
//         await firebase
//         .auth()
//         .signInWithEmailAndPassword(data.email, data.password)
//       } catch(error)  {
//           context.commit('setError', error.message)
//           context.commit('updateLoggingIn', false)
//       }
//     },
//     async signInGoogle (context){
//       context.commit('updateLoggingIn', true)
//       const provideGoogle = new firebase.auth.GoogleAuthProvider();
//       // try {
//       //   await firebase
//       //   .auth()
//       //   .signInWithPopup(provideGoogle)
//       //   .then(
//       //     user => {
//       //       const newUser = {
//       //         id: user.uid,
//       //         name: user.displayName,
//       //         email: user.email,
//       //         photo: user.photoURL
//       //       }
//       //       // // Link the credential to the current user.
//       //       // firebase.auth().currentUser.linkWithCredential(credential)
//       //       // .then(function(usercred) {
//       //       //   // The provider is now successfully linked.
//       //       //   // The phone user can now sign in with their phone number or email.
//       //       // })
//       //       .then(() => {
//       //         db.collection('users')
//       //         .add({id: newUser.uid, displayName: newUser.displayName, email: newUser.email, photo: newUser.photoUrl})
//       //       })
//       //       context.commit('setUser', newUser)
//       //     }
//       //   )
//       // } catch(error)  {
//       //   context.commit('setError', error.message)
//       //   context.commit('updateLoggingIn', false)
//       // }
//       firebase.auth().signInWithPopup(provideGoogle).catch(function(error) {
//         if (error.code === 'auth/account-exists-with-different-credential') {
//           let pendingCred = error.credential;
//           let email = error.email;
//           firebase.auth().fetchSignInMethodsForEmail(email).then(function(methods) {
//             if (methods[0] === 'password') {
//               let password = promptUserForPassword();
//               firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
//                 return user.linkWithCredential(pendingCred);
//               }).then(function() {
//                 goToApp();
//               });
//               return;
//             }
//             let provider = getProviderForProviderId(methods[0]);
//             firebase.auth().signInWithPopup(provider).then(function(result) {
//               result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
//                 // Google account successfully linked to the existing Firebase user.
//                 goToApp();
//               });
//             });
//           });
//         }
//       });
//     },
//     // getProviderForProviderId(id) {
//     //   switch(id) {
//     //     case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
//     //       return new firebase.auth.TwitterAuthProvider();
//     //     case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
//     //       return new firebase.auth.FacebookAuthProvider();
//     //     case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
//     //       return new firebase.auth.GoogleAuthProvider();
//     //   //case ... Todos los casos por cada Provider que uses en tu proyecto
//     //   }
//     // },
//     // promptUserForPassword(){
//     //   let pwd = prompt("Please enter your password");
//     //     if (pwd != null) {
//     //       return pwd;
//     //     }
//     // },
//     // goToApp(){
    
//     // },
//     // getProviderForProviderId() {
//     //   // [START auth_get_providers]
//     //   let googleProvider = new firebase.auth.GoogleAuthProvider();
//     //   let facebookProvider = new firebase.auth.FacebookAuthProvider();
//     //   let twitterProvider = new firebase.auth.TwitterAuthProvider();
//     //   let githubProvider = new firebase.auth.GithubAuthProvider();
//     //   // [END auth_get_providers]
//     // },
//     async signInFacebook (context, auth){
//       context.commit('updateLoggingIn', true)
//       //const provideFacebook = new firebase.auth.FacebookAuthProvider();
//       // try {
//       //   await firebase
//       //   .auth()
//       //   .signInWithPopup(provideFacebook)
//       //   .then(result => {
//       //     let token = result.credential.accessToken;
//       //       // ...
//       //       console.log(token)
//       //     let user = result.user;
//       //     let newUser = {
//       //       id: user.uid,
//       //       name: user.displayName,
//       //       email: user.email,
//       //       photoUrl: user.photoURL
//       //     }
//       //     // // Link the credential to the current user.
//       //     // firebase.auth().currentUser.linkWithCredential(credential)
//       //     // .then(function(usercred) {
//       //     //   // The provider is now successfully linked.
//       //     //   // The phone user can now sign in with their phone number or email.

//       //     // })
//       //     db.collection('users')
//       //       .add({id: newUser.uid, displayName: newUser.displayName, email: newUser.email, photo: newUser.photoUrl}) 
//       //     context.commit('setUser', newUser)
//       //   }).catch(function(error) {
//       //     // Handle Errors here.
//       //     let errorCode = error.code;
//       //     console.log(errorCode, ':errorCode')
//       //     let errorMessage = error.message;
//       //     console.log(errorMessage, ':errorMessage')
//       //     // The email of the user's account used.
//       //     let email = error.email;
//       //     console.log(email, ':email')
//       //     // The firebase.auth.AuthCredential type that was used.
//       //     let credential = error.credential;
//       //     console.log(credential, ':credential')
//       //     // ...
//       //   });
//       // } catch(error)  {
//       //   context.commit('setError', error.message)
//       //   context.commit('updateLoggingIn', false)
//       // }

//       await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function(error) {
//         if (error.code === 'auth/account-exists-with-different-credential') {
//           // let errorCode = error.code;
//           // console.log(errorCode, ':errorCode')
//           let pendingCred = error.credential;
//           let email = error.email;
//           console.log(email, ':email')
//           firebase.auth().fetchSignInMethodsForEmail(email).then(function(methods) {
//             // Step 3.
//             // If the user has several sign-in methods,
//             // the first method in the list will be the "recommended" method to use.
//             if (methods[0] === 'password') {
//               // Asks the user their password.
//               // In real scenario, you should handle this asynchronously.
//               let password = promptUserForPassword(); // TODO: implement promptUserForPassword.
//               firebase .auth().signInWithEmailAndPassword(email, password).then(function(user) {
//                 return user.linkWithCredential(pendingCred);
//               }).then(function() {
//                 goToApp();
//               });
//               return;
//             }
//             let provider = getProviderForProviderId(methods[0]);
//             //console.log(provider, 'provider')
//             firebase.auth().signInWithPopup(provider).then(function(result) {
//               let token = result.credential.accessToken;
//               console.log(token)
//               result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
//                 goToApp();
//               });
//             });
//           });
//         }
//       });

//     },
//     async signOutAction(context){
//       try{
//         firebase.auth().signOut();

//         context.commit('setUser', null);
//         context.commit('updateAuthenticated', false);
//         context.commit('updateLoggedInUser', null);
//         // context.commit('setStatus', 'success');
//         // context.commit('setError', null);

//       } catch(error) {
//         //context.commit('setStatus', 'failure');
//         context.commit('setError', error)
//       }
//     },
//     async forgotPassword(context, payload){
//       try{
//         await firebase.auth().sendPasswordResetEmail(payload.email)
//         // .then(() => {
//         //     alert('Check your registered email to reset the password!')
//         //     payload.email = {   
//         //       email: payload.email
//         //     }
//         //   })
//       } catch(error){
//         context.commit('setError', error)
//       }
//       console.log(payload.email, 'payload email')
//     },
//   }
// }

// try {
      //   await firebase
      //   .auth()
      //   .signInWithPopup(provideFacebook)
      //   .then(result => {
      //     let token = result.credential.accessToken;
      //       // ...
      //       console.log(token)
      //     let user = result.user;
      //     let newUser = {
      //       id: user.uid,
      //       name: user.displayName,
      //       email: user.email,
      //       photoUrl: user.photoURL
      //     }
      //     // Link the credential to the current user.
      //     firebase.auth().currentUser.linkWithCredential(credential)
      //     .then(function(usercred) {
      //       // The provider is now successfully linked.
      //       // The phone user can now sign in with their phone number or email.

      //     })
      //     db.collection('users')
      //       .add({id: newUser.uid, displayName: newUser.displayName, email: newUser.email, photo: newUser.photoUrl}) 
      //     context.commit('setUser', newUser)
      //   }).catch(function(error) {
      //     // Handle Errors here.
      //     let code = error.code;
      //     console.log(code, ':errorCode')
      //     // The firebase.auth.AuthCredential type that was used.
      //     let credential = error.credential;
      //     console.log(credential, ':credential')
      //     // ...
      //   });
      // } catch(error)  {
      //   context.commit('setError', error)
      //   context.commit('updateLoggingIn', false)
      // }


      // getProviderForProviderId(id) {
    //   switch(id) {
    //     case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
    //       return new firebase.auth.TwitterAuthProvider();
    //     case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
    //       return new firebase.auth.FacebookAuthProvider();
    //     case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
    //       return new firebase.auth.GoogleAuthProvider();
    //   //case ... Todos los casos por cada Provider que uses en tu proyecto
    //   }
    // },
    // promptUserForPassword(){
    //   let pwd = prompt("Please enter your password");
    //     if (pwd != null) {
    //       return pwd;
    //     }
    // },
    // goToApp(){
    
    //},

    // await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function(error) {
      //   if (error.code === 'auth/account-exists-with-different-credential') {
      //     // let errorCode = error.code;
      //     // console.log(errorCode, ':errorCode')
      //     let pendingCred = error.credential;
      //     let email = error.email;
      //     console.log(email, ':email')
      //     firebase.auth().fetchSignInMethodsForEmail(payload.email, payload.password).then(function(methods) {
      //       // Step 3.
      //       // If the user has several sign-in methods,
      //       // the first method in the list will be the "recommended" method to use.
      //       if (methods[0] === 'password') {
      //         // Asks the user their password.
      //         // In real scenario, you should handle this asynchronously.
      //         let password = '';
      //         console.log(password, 'password')
      //         //let password = promptUserForPassword(); // TODO: implement promptUserForPassword.
      //         firebase .auth().signInWithEmailAndPassword(email, password).then(function(user) {
      //           return user.linkWithCredential(pendingCred);
      //         }).then(function() {
      //           goToApp();
      //         });
      //         return;
      //       }
      //       let provider = getProviderForProviderId(methods[0]);
      //       //console.log(provider, 'provider')
      //       firebase.auth().signInWithPopup(provider).then(function(result) {
      //         let token = result.credential.accessToken;
      //         console.log(token)
      //         result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
      //           goToApp();
      //         });
      //       });
      //     });
      //   }
      // });