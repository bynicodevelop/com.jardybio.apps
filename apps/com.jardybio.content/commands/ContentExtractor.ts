import { getRandomUserAgent } from 'App/helpers/user-agent'
import UrlExtract from 'App/Models/UrlExtract'
import axios from 'axios'
import { load } from 'cheerio'

import {
  args,
  BaseCommand,
} from '@adonisjs/core/build/standalone'

interface IArticle {
  title: string
  content: string[]
}

export default class ContentExtractor extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'content:extractor'

  @args.string({ description: 'Nombre de la url a extraire' })
  public max: string

  /**
   * Command description is displayed in the "help" output
   */
  public
  static description = ''

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

  protected async fetchHtml(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': getRandomUserAgent(),
        },
      })

      if (response.status !== 200) {
        console.error(`Failed to fetch HTML: ${response.status}`)
        return ''
      }

      const htmlString = await response.data.toString()
      return htmlString
    } catch (error) {
      console.error('Error:', error)
      return ''
    }
  }

  public extractArticle(htmlString: string): IArticle {
    const $ = load(htmlString)

    const titleElement = $('.article h1')
    const title = titleElement ? titleElement.text().trim() : ''

    const contentElements = $('.article .rte *')
    const content: string[] = []

    contentElements.each((_, element): void => {
      content.push($(element).text().trim())
    })

    return { title, content }
  }

  private sleep(seconds: number): Promise<void> {
    return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, seconds))
  }

  public async run(): Promise<void> {
    this.logger.info('Hello world!')

    const urls = await UrlExtract.getUrlsNotExtracted(parseInt(this.max))

    this.logger.info(`Found ${urls.length} urls not extracted`)

    for (const url of urls) {
      const htmlContent = await this.fetchHtml(url.url)

      const article = this.extractArticle(htmlContent)

      url.extracted = true

      await url.related('contentExtracted').create({
        title: article.title,
        content: article.content.join('\n'),
      })

      await url.save()

      await this.sleep(3000)

      this.logger.info(`Extracted content from ${url.url}`)
    }
  }
}
}
