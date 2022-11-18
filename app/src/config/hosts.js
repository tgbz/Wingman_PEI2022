import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'http://10.0.2.2:3000';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://2347-89-114-79-212.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
