import db from './mongodb.ts'
import Song from './models/Song.ts'

db.link([Song])

export const getSongs = async (ctx: any) => {
  const key = ctx.request.url.searchParams.get('key')
  const value = ctx.request.url.searchParams.get('value')

  const songs = await Song.where('title', 'like', value).all()

  ctx.response.status = 200
  ctx.response.body = JSON.stringify(songs)
}