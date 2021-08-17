/**
 *
 *
 * @export
 * @interface IListener
 */
export interface IListener {
  /**
   *
   *
   * @type {string}
   * @memberof IListener
   */
  event: string;

  /**
   *
   *
   * @param {*} data
   * @memberof IListener
   */
  callback(data: any): void
}
