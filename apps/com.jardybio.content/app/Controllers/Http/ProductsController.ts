import Product from 'App/Models/Product'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductsController {
  public async index({}: HttpContextContract): Promise<Product[]> {
    const products = await Product.all()

    return products
  }

  public async store({ request }: HttpContextContract): Promise<Product> {
    const { name, description } = request.all()

    const product = await Product.create({
      name,
      description,
    })

    return product
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
