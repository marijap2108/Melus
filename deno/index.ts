import { createApp, createRouter } from "https://deno.land/x/servest@v1.3.4/mod.ts"
import { getUser, postUser, putUser } from './user.ts'
import { getSongs } from './songs.ts'

const app = createApp()

function UserRoutes () {
  const router = createRouter()
  router.get("/", (req) => {
    return getUser(req)
  })
  router.post("/", (req) => {
     return postUser(req)
  })
  router.put("/", (req) => {
    return putUser(req)
  })
  return router;
}

function SongsRouter () {
  const router = createRouter()
  router.get("/", (req) => {
    return getSongs(req)
  })
  return router;
}

app.route("/api/user", UserRoutes());
app.route("/api/songs", SongsRouter());

app.listen({ port: 8000 });