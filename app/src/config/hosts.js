import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://180a-2001-8a0-ff73-4200-199d-2023-73e5-818c.eu.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://180a-2001-8a0-ff73-4200-199d-2023-73e5-818c.eu.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
