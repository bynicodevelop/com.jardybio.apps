import UrlExtract from 'App/Models/UrlExtract'
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

import { args, BaseCommand } from '@adonisjs/core/build/standalone'

export default class SiteMapExtractor extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'sitemap:extractor'

  @args.string({ description: 'The url of the site to extract the sitemap from' })
  public url: string

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

  public async fetchSitemap(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        },
      })
      return response.data
    } catch (error) {
      console.error(`Failed to fetch sitemap XML: ${error}`)
      return ''
    }
  }

  public extractUrls(xml: string): string[] {
    const parser = new XMLParser()
    const jsonObj = parser.parse(xml)

    if (!jsonObj.urlset || !jsonObj.urlset.url) {
      return []
    }

    const urls = jsonObj.urlset.url.map((urlObj: any): any => urlObj.loc)

    return urls
  }

  public async saveUrlsToDatabase(urls: string[]): Promise<void> {
    try {
      for (const url of urls) {
        const urlExtract = new UrlExtract()
        urlExtract.url = url
        await urlExtract.save()
      }
      console.log('URLs have been saved to the database.')
    } catch (error) {
      console.error(`Failed to save URLs to the database: ${error}`)
    }
  }

  public async run(): Promise<void> {
    const xml = await this.fetchSitemap(this.url)

    if (!xml) {
      this.logger.error('Failed to fetch sitemap XML')
      return
    }

    const urls = this.extractUrls(xml)
    this.logger.info(`Extracted ${urls.length} URLs from sitemap:`)

    await this.saveUrlsToDatabase(urls)

    urls.forEach((url): void => this.logger.info(url))
  }
}
