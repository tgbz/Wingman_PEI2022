import { Platform } from "react-native";

let serverURL = "https://2758-2001-8a0-f3f5-b100-e99d-47ba-305e-3fea.ngrok.io"

if (Platform.OS == "android") {
  serverURL = "https://2758-2001-8a0-f3f5-b100-e99d-47ba-305e-3fea.ngrok.io";
} else if (Platform.OS == "ios") {
  serverURL = "https://2758-2001-8a0-f3f5-b100-e99d-47ba-305e-3fea.ngrok.io";
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
