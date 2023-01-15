import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://f85f-2-83-243-191.eu.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://f85f-2-83-243-191.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
