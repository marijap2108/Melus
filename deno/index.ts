import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { getUser, postUser, putUser } from './user.ts'
import { getSongs } from './songs.ts'
import { getInitial } from './initial.ts'
import { favoriteSong, unfavoriteSong } from "./favorite.ts";
import { getFavoriteSongs } from './getFavoriteSongs.ts'

const app = new Application();

const router = new Router();

router
  .get("/api/user", getUser)
  .post("/api/user", postUser)
  .put("/api/user", putUser)
  .get("/api/songs", getSongs)
  .get("/api/initial", getInitial)
  .post("/api/favorite", favoriteSong)
  .post("/api/unfavorite", unfavoriteSong)
  .get("/api/songs/favorite", getFavoriteSongs)
  .get("/api", (ctx) => ctx.response.body = "uso")

app.use(
  oakCors({
    origin: "*"
  }),
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ 
  port: 8000, 
  // secure: true, 
  // certFile: './localhost.pem', 
  // keyFile: './localhost-key.pem' 
});