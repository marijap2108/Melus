import { createApp, contentTypeFilter, createRouter } from "https://deno.land/x/servest@v1.3.4/mod.ts";
import { getUser, postUser, putUser } from './user.ts'

const app = createApp();

function UserRoutes() {
  const router = createRouter();
  router.get("/", (req) => {
    return getUser(req)
  });
  router.post("/", (req) => {
     return postUser(req)
  });
  router.put("/", (req: any) => {
    return putUser(req)
  });
  return router;
}

app.route("/api/user", UserRoutes());

app.listen({ port: 8000 })