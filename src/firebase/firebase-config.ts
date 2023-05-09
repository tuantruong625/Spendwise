const config = {
  apiKey: "AIzaSyARvQGW_izv6zFG2F-Y9isLHzE3rGYDJRo",
  authDomain: "spendwise-921fb.firebaseapp.com",
  projectId: "spendwise-921fb",
  storageBucket: "spendwise-921fb.appspot.com",
  messagingSenderId: "706160521306",
  appId: "1:706160521306:web:c38cce1afc76b0a157e863",
  measurementId: "G-TQWN0B7TZZ"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
  } else {
    return config;
  }
}    
