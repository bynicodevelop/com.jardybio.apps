import { DateTime } from 'luxon'

import { BaseModel, beforeCreate, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import ContentExtracted from './ContentExtracted'

export default class UrlExtract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public extracted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static setExtractedToFalse(urlExtract: UrlExtract): void {
    urlExtract.extracted = false
  }

  public static async getUrlsNotExtracted(max: number): Promise<UrlExtract[]> {
    return await UrlExtract.query().where('extracted', false).limit(max)
  }

  @hasOne((): typeof ContentExtracted => ContentExtracted)
  public contentExtracted: HasOne<typeof ContentExtracted>
}
