import db from './mongodb.ts'
import Song from './models/Song.ts'

db.link([Song])

export const getSongs = async (req: any) => {
  const key = req.query.get('key')
  const value = req.query.get('value')

  const songs = await Song.where({ [key]: value }).get()

  await req.respond({body: JSON.stringify(songs), status: 200})
}