import db from './mongodb.ts'
import Song from './models/Song.ts'

db.link([Song])

export const getInitial = async (ctx: any) => {
  const id = ctx.request.url.searchParams.get('id')

  const artist = await Song.where({ artist: 'Post Malone' }).all()
  const album = await Song.where({ album: "Hollywood's Bleeding" }).all()

  const artistCollection ={
    id: 'asdsad',
    title: 'Artist: Post Malone',
    songs: artist
  }

  const albumCollection ={
    id: 'asdsadasd',
    title: "Album: Hollywood's Bleeding",
    songs: album
  }

  ctx.response.status = 200
  ctx.response.body = JSON.stringify([artistCollection, albumCollection, artistCollection, albumCollection, artistCollection, albumCollection, artistCollection, artistCollection])
}