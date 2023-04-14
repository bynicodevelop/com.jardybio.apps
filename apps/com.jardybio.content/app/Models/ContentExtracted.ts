import { DateTime } from 'luxon'

import {
  BaseModel,
  column,
} from '@ioc:Adonis/Lucid/Orm'

export default class ContentExtracted extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public urlExtractId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
