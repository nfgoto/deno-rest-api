import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";

const env = Deno.env.toObject();
const port = Number(env.PORT) || 5432;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods()); // allow all methods

console.log(`Oak server listening on ${port}`);

await app.listen({ port });
