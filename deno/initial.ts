import db from './mongodb.ts'
import Song from './models/Song.ts'

db.link([Song])

export const getInitial = async (ctx: any) => {
  const id = ctx.request.url.searchParams.get('id')

  const artist1 = await Song.where({ artist: 'Ariana Grande' }).all()
  const album1 = await Song.where({ album: "Hollywood's Bleeding" }).all()
  const artist2 = await Song.where({ artist: 'Post Malone' }).all()
  const album2 = await Song.where({ album: "Dangerous Woman" }).all()
  const artist3 = await Song.where({ artist: 'Imagine Dragons' }).all()
  const artist4 = await Song.where({ artist: 'Shakira' }).all()

  const artistCollection1 ={
    id: 'asdsad',
    title: 'Artist: Ariana Grande',
    songs: artist1
  }

  const albumCollection1 ={
    id: 'asdsadasd',
    title: "Album: Hollywood's Bleeding",
    songs: album1
  }

  const artistCollection2 ={
    id: 'asdjhjgsad',
    title: 'Artist: Post Malone',
    songs: artist2
  }

  const albumCollection2 ={
    id: 'asdgdhsagdsadasd',
    title: "Album: Dangerous Woman",
    songs: album2
  }

  const artistCollection3 ={
    id: 'asdjhjgseeead',
    title: 'Artist: Shakira',
    songs: artist4
  }

  const artistCollection4 ={
    id: 'asdjhjwweegsad',
    title: 'Artist: Imagine Dragons',
    songs: artist3
  }

  ctx.response.status = 200
  ctx.response.body = JSON.stringify([artistCollection3, albumCollection2, artistCollection4, albumCollection1, artistCollection3, artistCollection1, artistCollection3, artistCollection2, albumCollection2, artistCollection4, artistCollection1, artistCollection3])
}