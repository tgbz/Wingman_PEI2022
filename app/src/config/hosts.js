import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://5333-2001-8a0-ff73-4200-618c-c239-a436-27ab.eu.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://5333-2001-8a0-ff73-4200-618c-c239-a436-27ab.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
