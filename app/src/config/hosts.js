import { Platform } from "react-native";

let serverURL = "";

if (Platform.OS == "android") {
  serverURL = "https://a757-2001-8a0-ff73-4200-3128-44f9-c9dd-43c5.eu.ngrok.io";
} else if (Platform.OS == "ios") {
  serverURL = "https://a757-2001-8a0-ff73-4200-3128-44f9-c9dd-43c5.eu.ngrok.io";
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
