import app from "./app.js";

const PORT = process.env.PORT || 9100;

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
