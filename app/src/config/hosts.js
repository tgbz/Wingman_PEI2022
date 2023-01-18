import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://f16a-2001-8a0-ff73-4200-b537-b54f-6b59-5acd.eu.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://f16a-2001-8a0-ff73-4200-b537-b54f-6b59-5acd.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}
export { serverURL };
