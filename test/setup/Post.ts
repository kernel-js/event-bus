import { Model } from '../../src';
import { requestCollect, requestOne } from './mocks/DataFile';
import { IHandling, IQueryBuilder, IQueryModifier, IRequestConfig } from '../../src/Interfaces';

/**
 *
 *
 * @export
 * @class Post
 * @extends {Model}
 */
export default class Post extends Model {
  /**
   * Creates an instance of Post.
   * @memberof Post
   */
  constructor(queryBuild: IQueryBuilder, queryModifier: IQueryModifier, handling: IHandling) {
    super(queryBuild, queryModifier, handling)
  }

  /**
   *
   *
   * @template AxiosResponse
   * @param {IRequestConfig} config
   * @return {*}  {Promise<AxiosResponse>}
   * @memberof Post
   */
  public request<AxiosResponse>(config: IRequestConfig): Promise<AxiosResponse> {
    const expresionUrl = /^(http:\/\/localhost\/event-bus\/posts)(\?|\?[^\s]+)?$/;
    
    const request = expresionUrl.test(config.url) && config.method === ('GET' || 'get')
      ? requestCollect
      : requestOne

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(request as any)
      }, 10)
    })
  }

  /**
   *
   *
   * @readonly
   * @type {string}
   * @memberof Post
   */
  get resourceName(): string {
    return 'posts'
  }

  /**
   *
   *
   * @readonly
   * @type {string}
   * @memberof Post
   */
  get baseUrl(): string {
    return 'http://localhost/event-bus';
  } 

  /**
   *
   *
   * @readonly
   * @type {Array<string>}
   * @memberof Post
   */
  get fields(): Array<string> {
    return ['title', 'subtitle', 'body'];
  }

  /**
   *
   *
   * @readonly
   * @type {Array<string>}
   * @memberof Post
   */
  get relationshipNames(): Array<string> {
    return ['author', 'tags'];
  }

  /**
   *
   *
   * @return {*}  {Promise<Post>}
   * @memberof Post
   */
  async report(): Promise<Post> {
    this.setConfig({
      method: 'GET',
      url: `${this.baseUrl}/${this.resourceName}/reports${this.queryBuilder.getQuery()}`
    });

    return this;
  }
}
