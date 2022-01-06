import { Bson } from "https://deno.land/x/mongo@v0.29.0/mod.ts"
import db from './mongodb.ts'

interface IUser {
  id?: string,
  username: string,
  email: string,
  dateOfBirth: string,
}

const usersCollections = db.collection('User')

export const getUser = async (req: any) => {
  const bodyJson = (await req.text()) as { email: string; password: string }

  if (!bodyJson || !bodyJson.email || !bodyJson.password) {

    await req.respond({status: 204, body: JSON.stringify(bodyJson)})
    return
  }

  const user = await usersCollections.findOne({ email: bodyJson.email, password: bodyJson.password })

  if (!user) {
    await req.respond({status: 204})
    return
  }

  await req.respond({
    body: JSON.stringify(user),
    status: 200
  })
}

export const postUser = async (req: any) => {
  const bodyJson = (await req.json()) as IUser & { password: string };

  const id = await usersCollections.insertOne({...bodyJson})

  const newUser: IUser = {...bodyJson, id: id}

  await req.respond({body: JSON.stringify(newUser), status: 200})
}

export const putUser = async (req: any) => {
  const bodyJson = (await req.json()) as IUser & { password: string };

  const newValues: IUser & { password: string } = bodyJson

  usersCollections.updateOne({ _id: new Bson.ObjectId(bodyJson.id) }, {
    $set: {
      username: newValues.username
    }
  })

  await req.respond({status: 202})  
}