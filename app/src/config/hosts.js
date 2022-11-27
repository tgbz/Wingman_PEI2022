import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://a8c7-2001-8a0-f3f5-b100-ec93-58db-eb08-c625.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://a8c7-2001-8a0-f3f5-b100-ec93-58db-eb08-c625.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
