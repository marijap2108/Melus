import { Bson } from "https://deno.land/x/mongo@v0.29.0/mod.ts"
import db from './mongodb.ts'
import User from './models/User.ts'
import Favorite from './models/Favorite.ts'

db.link([User, Favorite])

export const getUser = async (ctx: any) => {
  const email = ctx.request.url.searchParams.get('email')
  const password = ctx.request.url.searchParams.get('password')

  const user = await User.where({ email: email.toLowerCase(), password: password }).first()

  const favorites = await Favorite.where({userId: user._id?.toString() || ''}).all()

  ctx.response.status = 200
  ctx.response.body = JSON.stringify({...user, favorites: favorites})
}

export const postUser = async (ctx: any) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { username, email, password, dateOfBirth } = await value;

  const user = new User()
  user.username = username
  user.email = email
  user.password = password
  user.dateOfBirth = parseInt(dateOfBirth)
  await user.save();

  ctx.response.status = 200
  ctx.response.body = JSON.stringify(user)
}

export const putUser = async (ctx: any) => {
  const { value } = ctx.request.body({ type: 'json' })
  const { id, username, password } = await value

  if (username) {
    User.where('_id', `${new Bson.ObjectId(id)}`).update({ username: username })
  }

  if (password) {
    User.where('_id', `${new Bson.ObjectId(id)}`).update({ password: password })
  }

  ctx.response.status = 202
}
