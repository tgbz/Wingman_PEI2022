import { Platform } from "react-native";

let serverURL = "https://30fe-2001-818-e7a8-c500-551d-4197-9227-2dd7.eu.ngrok.io"

if (Platform.OS == "android") {
  serverURL = "https://30fe-2001-818-e7a8-c500-551d-4197-9227-2dd7.eu.ngrok.io";
} else if (Platform.OS == "ios") {
  serverURL = "https://30fe-2001-818-e7a8-c500-551d-4197-9227-2dd7.eu.ngrok.io";
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
