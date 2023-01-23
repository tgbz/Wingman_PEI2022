import { Platform } from "react-native";

let serverURL = "";

if (Platform.OS == "android") {
  serverURL = "https://22f1-2001-818-dafd-2100-49d4-a948-2132-1963.eu.ngrok.io";
} else if (Platform.OS == "ios") {
  serverURL = "https://22f1-2001-818-dafd-2100-49d4-a948-2132-1963.eu.ngrok.io";
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
