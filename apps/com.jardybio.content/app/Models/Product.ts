import { DateTime } from 'luxon'

import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { ProductEntity } from '@packages/interfaces'

import Article from './Article'

export default class Product extends BaseModel implements ProductEntity {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public description!: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany((): typeof Article => Article)
  public articles: HasMany<typeof Article>
}
