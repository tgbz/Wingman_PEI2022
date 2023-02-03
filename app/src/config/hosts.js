import { Platform } from "react-native";

let serverURL = "https://2758-2001-8a0-f3f5-b100-e99d-47ba-305e-3fea.ngrok.io"

if (Platform.OS == "android") {
  serverURL = "https://0265-2001-8a0-ff73-4200-1980-3344-8ccc-3c1.eu.ngrok.io";
} else if (Platform.OS == "ios") {
  serverURL = "https://0265-2001-8a0-ff73-4200-1980-3344-8ccc-3c1.eu.ngrok.io";
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
