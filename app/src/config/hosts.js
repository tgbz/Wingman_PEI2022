import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'http://10.0.2.2:3000';
} else if (Platform.OS == 'ios') {
    serverURL = 'http://4f1b-2001-8a0-f3f5-b100-c5f1-1232-1eb4-80a2.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';s
}

export { serverURL };
