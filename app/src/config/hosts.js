import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://f4df-2001-8a0-ff73-4200-3545-c20b-17e5-623c.eu.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://f4df-2001-8a0-ff73-4200-3545-c20b-17e5-623c.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
