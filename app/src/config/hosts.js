import { Platform } from "react-native";

let serverURL = "";

if (Platform.OS == "android") {
  serverURL = "https://4e27-2001-8a0-ff73-4200-1041-afb6-ba7f-d660.eu.ngrok.io";
} else if (Platform.OS == "ios") {
  serverURL = "https://4e27-2001-8a0-ff73-4200-1041-afb6-ba7f-d660.eu.ngrok.io";
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
