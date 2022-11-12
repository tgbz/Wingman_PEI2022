import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  module.exports.serverURL  = "http://10.0.2.2:3000";
} else if (Platform.OS === 'android') {
  module.exports.serverURL  = "http://10.0.2.2:3000";
} else if (Platform.OS === 'web') {
  module.exports.serverURL = "http://localhost:3000";
}


