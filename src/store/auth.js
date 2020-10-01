import { firebase, db } from '../firebaseinit'
import { router } from '../router/router'

export default {
  strict: true,
  namespaced: true,
  state: {
    user: null,
    userYogurts: null,
    // status: null,
    error: null,
    authenticated: false,
    loggedInUser: { uid: null, email: '', displayName: '' },
    loggingIn: false,
    signingUp: false,
    notifications: []
  },
  getters: {
    user: state => state.loggedInUser,
    error: state => state.error,
    authenticated: state => state.authenticated,
    loggedInUser: state => state.loggedInUser,
    loggingIn: state => state.loggingIn,
    signingUp: state => state.signingUp,
  },
  mutations: {
    //setUser: state => state.user = firebase.auth().currentUser,
    setUser: (state, payload) => state.user = payload,
    //removeUser: state => state.user = null,
    // updateUser: (state, user) => state.loggedInUser = user,
    updateAuthenticated: (state, authenticated) => state.authenticated = authenticated,
    updateLoggedInUser: (state, user) => state.loggedInUser = user,
    updateLoggingIn: (state, status) => state.loggingIn = status,
    updateSigningUp: (state, status) => state.signingUp = status,
    // setStatus (state, payload) {
    //   state.status = payload 
    // },
    pushNotification: (state, notification) => {
      state.notifications.push({
          ...notification,
          id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
      })
    },
    removeNotification: (state, notificationToRemove) => {
      state.notifications = state.notifications.filter(notification => {
          return notification.id != notificationToRemove.id;
      })
    },
    setError: (state, payload) => state.error = payload,
  },
  actions: {
    addNotification: (context, notification) => context.commit('pushNotification', notification),
    removeNotification: (context, notification) => context.commit('removeNotification', notification),
    updateAuthenticated: (context, authenticated) => context.commit('updateAuthenticated', authenticated),
    async authStateChangeHandler (context, user) {
      if (user) {

        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: user.metadata.creationTime,
          providerData: user.providerData
        }
        // .then(() => {
          // db.collection('users').update({
          //   uid: user.uid,
          //   email: user.email,
          //   displayName: user.displayName,
          //   photo: user.photoURL,
          //   providerData: user.providerData,
          // })
        // })
        
        console.log(userData, 'userData'),
        // db.collection("users")
        //   .doc(user.uid)
        //   .collection("yogurt")
         //.orderBy("createAt") //firebase method of sorting
        db.collection('users/'+this.uid+'/users-yogurts').onSnapshot(snapshot => {
          const snapData = [];
          snapshot.forEach( doc => {
            snapData.push({
              id: doc.id,
              title: doc.data().title
              
            });
          });
          // this.meetings = snapData.sort((a, b) => {
          //   if (a.name.toLowerCase() < b.name.toLowerCase()) {
          //       return 1;
          //     } else {
          //       return -1;
          //     }
          //   });
          });
      

        context.commit('updateAuthenticated', true)
        context.commit('updateLoggedInUser', userData)
        //TODO: Should only send to dashboard if coming from 'home'
        router.push({ name: 'Dashboard' }).catch(error => {context.commit('setError', error)})
      } else {
        // User is signed out
        context.commit('updateAuthenticated', false)
        context.commit('updateLoggedInUser', { uid: null, email: null, displayName: null })
        router.push({ name: 'Home' }).catch(error => {context.commit('setError', error)})
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
    async signUpAction ( context, payload, error){
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
      
      // console.log('this is payload', payload)
      context.commit('updateLoggedInUser', payload)
      context.commit('setError', error)
      return payload
    },
    async signInAction (context, data){
      context.commit('updateLoggingIn', true)
      try {
        await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
      } catch(error)  {
          context.commit('setError', error)
          context.commit('updateLoggingIn', false)
      }
    },
    async signInGoogle (context){
      context.commit('updateLoggingIn', true)
      //const provideGoogle = new firebase.auth.GoogleAuthProvider();
      try {
        await firebase
        .auth()
        .signInWithPopup(provideGoogle)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photo: user.photoURL
            }
            .then(() => {
              db.collection('users')
              .add({id: newUser.uid, displayName: newUser.displayName, email: newUser.email, photo: newUser.photoUrl})
            })
            context.commit('setUser', newUser)
          }
        )
      } catch(error)  {
        context.commit('setError', error.message)
        context.commit('updateLoggingIn', false)
      }
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function(error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          let pendingCred = error.credential;
          let email = error.email;
          firebase.auth().fetchSignInMethodsForEmail(email).then(function(providers) {
            if (providers.indexOf(firebase.auth.EmailAuthProvider.PROVIDER_ID) != -1) {
              let password = window.prompt('Please provide the password for ' + email);
              firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
                user = firebase.auth().currentUser
                return user.linkWithCredentiall(pendingCred);
              }).then(function() {
                goToApp();
              });
              return;
            }
            let provider = new firebase.auth.EmailAuthProvider()
            firebase.auth().signInWithPopup(provider).then(function(result) {
              result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                console.log('Google account successfully linked to the existing Firebase user.')
                goToApp();
              });
            });
          });
        }
      });
    },
    async signInFacebook (context){
      context.commit('updateLoggingIn', true)
      //const provideFacebook = new firebase.auth.FacebookAuthProvider();
      
      let existingEmail = null;
      let pendingCred = null;
      let facebookProvider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(facebookProvider)
        .then(function(result) {
          // Successful sign-in.
          let user = result.user;
          console.log(user, 'line 226')
        })
        .catch(function(error) {
          // Account exists with different credential. To recover both accounts
          // have to be linked but the user must prove ownership of the original
          // account.
          if (error.code == 'auth/account-exists-with-different-credential') {
            existingEmail = error.email;
            pendingCred = error.credential;
            // Lookup existing account’s provider ID.
            return firebase.auth().fetchSignInMethodsForEmail(error.email)
              .then(function(providers) {
                if (providers.indexOf(firebase.auth.EmailAuthProvider.PROVIDER_ID) != -1) {
                  // Password account already exists with the same email.
                  // Ask user to provide password associated with that account.
                  let password = window.prompt('Please provide the password for ' + existingEmail);
                  return firebase.auth().signInWithEmailAndPassword(existingEmail, password);    
                } else if (providers.indexOf(firebase.auth.GoogleAuthProvider.PROVIDER_ID) != -1) {
                  let googleProvider = new firebase.auth.GoogleAuthProvider();
                  // Sign in user to Google with same account.
                  googleProvider.setCustomParameters({'login_hint': existingEmail});
                  return firebase.auth().signInWithPopup(googleProvider).then(function(result) {
                    return result.user;
                  });
                } else {
                  //...
                  console.log('issue happened here line 250')
                }
              })
              .then(function(user) {
                // Existing email/password or Google user signed in. user = result.user;
                // Link Facebook OAuth credential to existing account. firebase.auth().currentUser.linkWithCredential(pendingCred).then (...)
                user = firebase.auth().currentUser
                return user.linkWithCredential(pendingCred);
              });
          }
        })
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
        context.commit('setError', error)
      }
    },
    async forgotPassword(context, payload){
      try{
        await firebase.auth().sendPasswordResetEmail(payload.email)
        // .then(() => {
        //     alert('Check your registered email to reset the password!')
        //     payload.email = {   
        //       email: payload.email
        //     }
        //   })
      } catch(error){
        context.commit('setError', error)
      }
      console.log(payload.email, 'payload email')
    },

    // User create yogurt
    addYogurt: function(payload) {
      db.collection('users/'+this.user.uid+'/user_yogurts')
      .doc(this.user.uid)
      .collection("users-yogurts")
      .add({
        name: payload,
        createAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    },
    deleteYogurt(payload) {
      // db.collection("users")
      // .doc(this.user.uid)
      db.collection('users/'+this.user.uid+'/user_yogurts')
      .collection("user_yogurts")
      .doc(payload)
      .delete();
    }
  }
}