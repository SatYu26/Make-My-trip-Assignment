import app from "./app.js";

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Payment service listening on port ${PORT}`);
});
