import { Platform } from "react-native";

let serverURL = "https://c7e8-2001-8a0-f3f5-b100-943a-a533-1fb9-2f55.ngrok.io"

if (Platform.OS == "android") {
  serverURL = "https://7ad7-2001-8a0-ff73-4200-1980-3344-8ccc-3c1.eu.ngrok.io";
} else if (Platform.OS == "ios") {
  serverURL = "https://7ad7-2001-8a0-ff73-4200-1980-3344-8ccc-3c1.eu.ngrok.io";
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
