import { Platform } from "react-native";

let serverURL = "https://30fe-2001-818-e7a8-c500-551d-4197-9227-2dd7.eu.ngrok.io"

if (Platform.OS == "android") {
  serverURL = "https://30fe-2001-818-e7a8-c500-551d-4197-9227-2dd7.eu.ngrok.io";
} else if (Platform.OS == "ios") {
<<<<<<< HEAD
  serverURL = "https://6a1e-2001-818-dafd-2100-c590-6191-88ce-785c.eu.ngrok.io";
=======
  serverURL = "https://30fe-2001-818-e7a8-c500-551d-4197-9227-2dd7.eu.ngrok.io";
>>>>>>> 9fab60b6f02d17bcb744132c53c8ad5ecf8467ae
} else {
  serverURL = "http://localhost:3000";
}
export { serverURL };
