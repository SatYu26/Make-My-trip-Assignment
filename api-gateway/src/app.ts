import express from "express";
import gatewayRoutes from "./routes/gateway";

const app = express();
app.use(gatewayRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
