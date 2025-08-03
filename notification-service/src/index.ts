import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 9100;

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
