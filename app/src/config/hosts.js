import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = ' https://c7e8-2001-8a0-f3f5-b100-943a-a533-1fb9-2f55.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://c7e8-2001-8a0-f3f5-b100-943a-a533-1fb9-2f55.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
