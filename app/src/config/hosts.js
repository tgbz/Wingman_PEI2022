import { Platform } from "react-native";

let serverURL = "";

if (Platform.OS == "android") {
  serverURL = "https://7818-2001-818-e7a8-c500-7942-e76f-4613-7738.eu.ngrok.io";
} else if (Platform.OS == "ios") {
  serverURL = "https://c7e8-2001-8a0-f3f5-b100-943a-a533-1fb9-2f55.ngrok.io";
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
