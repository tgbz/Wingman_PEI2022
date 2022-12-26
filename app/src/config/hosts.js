import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://8b6e-2001-8a0-ff73-4200-60a7-4fa4-3047-2538.eu.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://8b6e-2001-8a0-ff73-4200-60a7-4fa4-3047-2538.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
