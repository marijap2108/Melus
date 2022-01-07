import { Model } from 'https://deno.land/x/denodb/mod.ts';
import { DataTypes } from 'https://deno.land/x/denodb/mod.ts';

export default class Song extends Model {
  static table = 'songs'

  static fields = {
    _id: {
      primaryKey: true,
    },
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    album: DataTypes.STRING,
    artwork: DataTypes.STRING,
    duration: DataTypes.INTEGER
  };

  static timestamps = true;
}