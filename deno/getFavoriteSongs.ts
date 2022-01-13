import db from './mongodb.ts'
import Song from './models/Song.ts'
import Favorite from './models/Favorite.ts'

db.link([Song, Favorite])

export const getFavoriteSongs = async (ctx: any) => {
  const userId = ctx.request.url.searchParams.get('id')

  const songIds = await Favorite.select('songId').where({ userId: userId }).all()
  const allSongs: any = await Song.all()

  const songIdsFormatted: any[] = []

  songIds.map((v: any) => songIdsFormatted.push(v.songId))

  ctx.response.status = 200
  ctx.response.body = JSON.stringify(allSongs.filter((v: { _id: any; }) => songIdsFormatted.includes(v._id.toString())))
}