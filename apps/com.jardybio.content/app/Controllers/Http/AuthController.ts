import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { messages } from '@packages/messages'

import Auth from '../../Models/Auth'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const login = request.input('login')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(login, password, {
        expiresIn: '10 days',
      })

      return token.toJSON()
    } catch {}

    return response.status(400).json({
      errors: [messages.INVALID_CREDENTIALS.KEY],
    })
  }

  public async createAccount({ request, auth }: HttpContextContract) {
    const login = request.input('login')
    const password = request.input('password')

    const user = await Auth.create({
      email: login,
      password,
    })

    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    })

    return token.toJSON()
  }
}
