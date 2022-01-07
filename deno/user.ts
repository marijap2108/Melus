import { Bson } from "https://deno.land/x/mongo@v0.29.0/mod.ts"
import db from './mongodb.ts'
import User from './models/User.ts'

db.link([User])

export const getUser = async (req: any) => {
  const username = req.query.get('username')
  const password = req.query.get('password')

  const user = await User.where({ username: username, password: password }).first()

  await req.respond({body: JSON.stringify(user), status: 200})
}

export const postUser = async (req: any) => {
  const bodyJson = (await req.json());

  const user = new User()
  user.username = bodyJson.username
  user.email = bodyJson.email
  user.password = bodyJson.password
  user.dateOfBirth = bodyJson.dateOfBirth
  await user.save();

  await req.respond({body: JSON.stringify(user), status: 200})
}

export const putUser = async (req: any) => {
  const bodyJson = (await req.json());

  await User.where('_id', `${new Bson.ObjectId(bodyJson.id)}`).update({ username: bodyJson.username });

  await req.respond({status: 202})  
}