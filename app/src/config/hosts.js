import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'http://10.0.2.2:3000';
} else if (Platform.OS == 'ios') {
    serverURL = 'http://b22f-2001-8a0-f3f5-b100-56a-d368-8263-5f25.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
