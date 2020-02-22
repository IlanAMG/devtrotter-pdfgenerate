import app from 'firebase/app'
import 'firebase/storage'
import firebaseConfig from './config';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.storage = app.storage()
    }
}

const firebase = new Firebase()

export default firebase