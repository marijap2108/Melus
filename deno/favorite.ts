import db from './mongodb.ts'
import Favorite from './models/Favorite.ts'

db.link([Favorite])

export const favoriteSong = async (ctx:any) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { userId, songId } = await value;

  if (!songId || !userId) {
    ctx.response.body = JSON.stringify({userId: userId, songId: songId})
    ctx.response.status = 404
    return
  }

  const favorite = new Favorite();
  favorite.userId = userId
  favorite.songId = songId
  favorite.save();

  ctx.response.status = 202
}

export const unfavoriteSong = async (ctx:any) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { userId, songId } = await value;

  if (!songId || !userId) {
    ctx.response.status = 404
    return
  }

  Favorite.where({userId: userId, songId: songId}).delete()

  ctx.response.status = 202
}