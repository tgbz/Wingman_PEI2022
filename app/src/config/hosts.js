import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://e10b-2001-8a0-ff73-4200-e5c6-6e1a-678b-34c1.eu.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://e10b-2001-8a0-ff73-4200-e5c6-6e1a-678b-34c1.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
