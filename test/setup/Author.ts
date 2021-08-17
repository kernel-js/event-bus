import Axios from 'axios';
import { IRequestConfig } from '../../src/Interfaces';
import { Model, QueryBuilder, QueryModifier, Handling } from '../../src';

/**
 *
 *
 * @export
 * @class Author
 * @extends {Model}
 */
export default class Author extends Model {
  /**
   * Creates an instance of Author.
   * @memberof Author
   */
  constructor() {
    super(new QueryBuilder(), new QueryModifier(), new Handling())
  }

  /**
   *
   *
   * @protected
   * @param {IRequestConfig} config
   * @return {*}  {Promise<any>}
   * @memberof Author
   */
  protected request(config: IRequestConfig): Promise<any> {
    return Axios.request(config);
  }

  /**
   *
   *
   * @readonly
   * @type {string}
   * @memberof Author
   */
  get resourceName(): string {
    return 'authors'
  }

  /**
   *
   *
   * @readonly
   * @type {string}
   * @memberof Author
   */
  get baseUrl(): string {
    return 'http://localhost/event-bus';
  } 

  /**
   *
   *
   * @readonly
   * @type {Array<string>}
   * @memberof Author
   */
  get fields(): Array<string> {
    return ['name', 'email'];
  }

  /**
   *
   *
   * @readonly
   * @type {Array<string>}
   * @memberof Author
   */
  get relationshipNames(): Array<string> {
    return ['posts'];
  }
}
