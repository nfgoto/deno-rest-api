import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.ts";
import { Ctx } from "./types.ts";

const router = new Router();

router.get("/", (ctx: { response: any }) => {
  const { response } = ctx;
  response.body = "Server running";
});

router
  .get("/api/v1/products", getProducts)
  .get("/api/v1/products/:id", getProduct)
  .post("/api/v1/products", addProduct)
  .put("/api/v1/products/:id", updateProduct)
  .delete("/api/v1/products/:id", deleteProduct);

export default router;
