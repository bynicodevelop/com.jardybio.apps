// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ContentExtracted from '../../Models/ContentExtracted'

export default class ContentsController {
  public async index({ response }): Promise<any> {
    const contents = await ContentExtracted.all()

    return response.json(contents)
  }
}
