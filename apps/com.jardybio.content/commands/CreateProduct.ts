import Product from 'App/Models/Product'

import { args, BaseCommand } from '@adonisjs/core/build/standalone'

export default class CreateProduct extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:product'

  @args.string({ description: 'The name of the product' })
  public name: string

  @args.string({ description: 'The description of the product' })
  public description: string

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run(): Promise<void> {
    const product = new Product()

    product.name = this.name
    product.description = this.description

    await product.save()

    this.logger.info(`Product ${product.name} created`)
  }
}
