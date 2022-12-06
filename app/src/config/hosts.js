import { Platform } from 'react-native';

let serverURL = "";

if (Platform.OS == 'android') {
    serverURL = 'https://2a22-2001-8a0-ff73-4200-9907-47af-b977-86bc.eu.ngrok.io';
} else if (Platform.OS == 'ios') {
    serverURL = 'https://6bf2-2001-8a0-f3f5-b100-954d-2a60-175e-bebf.ngrok.io';
} else {
    serverURL = 'http://localhost:3000';
}

export { serverURL };
