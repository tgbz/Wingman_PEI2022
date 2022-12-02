import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'http://10.0.2.2:3000';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://6a55-2001-8a0-ff73-4200-7404-f65a-faea-9bc8.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
