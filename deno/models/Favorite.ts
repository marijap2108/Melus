import { Model } from 'https://deno.land/x/denodb/mod.ts';
import { DataTypes } from 'https://deno.land/x/denodb/mod.ts';

export default class Favorite extends Model {
  static table = 'favorites'

  static fields = {
    userId: DataTypes.STRING,
    songId: DataTypes.STRING,
  };

  static timestamps = true;
}