import express from "express";
import cartRouter from "./cart.router.js";
import { productRouter } from "./product.router.js";
import messageRouter from "./message.router.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.render("home");
});

router.use("/carts", cartRouter);
router.use("/products", productRouter);
router.use("/messages", messageRouter);

export default router;