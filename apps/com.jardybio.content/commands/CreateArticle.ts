import { Configuration, OpenAIApi } from 'openai'

import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class CreateArticle extends BaseCommand {
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
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
    })

    const openai = new OpenAIApi(configuration)

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

    // const response = await openai.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   messages,
    // })

    // console.log(response.data.choices[0].message)

    const data = {
      role: 'assistant',
      content:
        '[\n' +
        '  "Comment faire pousser des pommes de terre facilement avec un sac de culture en 7/10 gallons",\n' +
        '  "Le sac de culture de pommes de terre : une solution idéale pour les petits espaces",\n' +
        '  "Découvrez comment utiliser un sac de culture de pommes de terre pour une récolte abondante",\n' +
        '  "Le jardinage sans jardin : cultivez des pommes de terre sur votre balcon avec le sac de culture",\n' +
        '  "Le sac de culture de pommes de terre avec rabat et poignée : pratique et résistant",\n' +
        '  "Les avantages du sac de culture de pommes de terre pour des légumes et des oignons sains",\n' +
        '  "Comment choisir son sac de culture de pommes de terre en fonction de ses besoins",\n' +
        '  "Le sac de culture de pommes de terre : une alternative écologique aux pots de jardin traditionnels",\n' +
        '  "Les astuces à connaître pour réussir sa culture de pommes de terre avec un sac de culture"\n' +
        ']',
    }

    console.log(JSON.parse(data.content))

    this.logger.info('Hello world!')
  }
}
