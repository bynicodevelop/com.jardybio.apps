import Product from 'App/Models/Product'

import { args, BaseCommand } from '@adonisjs/core/build/standalone'

export default class CreateArticle extends BaseCommand {
  @args.string({ description: 'Id of product' })
  public id: string

  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:article'

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
    console.log(this.id)
    // const configuration = new Configuration({
    //   apiKey: process.env.OPENAI_API_KEY,
    //   organization: process.env.OPENAI_ORGANIZATION,
    // })

    // const openai = new OpenAIApi(configuration)

    // const messages = [
    //   {
    //     role: 'system',
    //     content:
    //       "Tu es un expert en rédaction de contenu pour blog dans le domaine du jardinage qui s'adresse à des lecteurs néophytes. Tu répondras sous forme de contenus optimisés pour le SEO, formaté, d'environ 200 mots.",
    //   },
    //   {
    //     role: 'user',
    //     content: "Rédige un article sur : 'Comment bien arroser ses semis de tomates'",
    //   },
    // ] as Array<ChatCompletionRequestMessage>

    // const messages = [
    //   {
    //     role: 'system',
    //     content:
    //       "Tu es un expert en rédaction de contenu de blog dans le domaine du jardinage qui s'adresse à des lecteurs néophytes. Ton objectif est de donner des titres d'articles qui soient pertinents et qui attirent le lecteur. Tu retourneras tes réponses sous la forme d'un tableau JSON de type : `['title 1', 'title 1', '...']`",
    //   },
    //   {
    //     role: 'user',
    //     content: "Liste des idées d'articles sur : 'arrosage des semis de tomates'",
    //   },
    // ] as Array<ChatCompletionRequestMessage>

    // const messages = [
    //   {
    //     role: 'system',
    //     content: `Tu es un expert en rédaction d'article de blog pour un site E-commerce JardyBio dans le domaine du jardinage qui s'adresse à des lecteurs néophytes.
    //       Tu recevras la description d'un produit en vente sur le site JardyBio.
    //       Ton objectif est de donner des titres d'articles qui soient pertinents et qui attirent le lecteur.
    //       Tu retourneras tes réponses sous la forme d'un tableau JSON de type : "['title 1', 'title 1', '...']"`,
    //   },
    //   {
    //     role: 'user',
    //     content:
    //       "Liste des idées d'articles sur : 'Sac de culture de pommes de terre avec rabat et poignée, 7/10 gallons, épais, pour légumes et oignon, Pot de jardin d'extérieur'",
    //   },
    // ] as Array<ChatCompletionRequestMessage>

    // const messages = [
    //   {
    //     role: 'system',
    //     content: `Tu es un expert en rédaction d'article de blog pour un site E-commerce JardyBio dans le domaine du jardinage qui s'adresse à des lecteurs néophytes.
    //       Tu recevras la description d'un produit en vente sur le site JardyBio.
    //       Ton objectif est de donner des titres d'articles qui soient pertinents et qui attirent le lecteur.
    //       Tu retourneras tes réponses sous la forme d'un tableau JSON de type : "['title 1', 'title 1', '...']"`,
    //   },
    //   {
    //     role: 'user',
    //     content:
    //       "Liste des idées d'articles sur : 'Sac de culture de pommes de terre avec rabat et poignée, 7/10 gallons, épais, pour légumes et oignon, Pot de jardin d'extérieur'",
    //   },
    // ] as Array<ChatCompletionRequestMessage>

    // const response = await openai.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   messages,
    // })

    // console.log(response.data.choices[0].message)

    const data = {
      role: 'assistant',
      content: `[
          "Cultivez vos propres pommes de terre facilement avec notre sac de culture innovant",
          "JardyBio : découvrez notre sac de culture de pommes de terre pour un jardinage simplifié",
          "Jardinage pour débutants : comment utiliser notre sac de culture de pommes de terre pour des récoltes réussies",
          "Petit espace, grand rendement : optimisez votre balcon avec notre sac de culture pour légumes et oignons",
          "Récoltez vos légumes sans effort grâce à notre sac de culture de pommes de terre avec rabat",
          "Comment notre sac de culture de légumes PE peut transformer votre jardinage",
          "Rendre le jardinage accessible à tous avec notre sac de culture de pommes de terre et légumes"
        ]`,
    }

    const product = await Product.findOrFail(this.id)

    const articles = await product
      .related('articles')
      .createMany(JSON.parse(data.content).map((title: string) => ({ title })))

    console.log(articles)

    this.logger.info('Hello world!')
  }
}
