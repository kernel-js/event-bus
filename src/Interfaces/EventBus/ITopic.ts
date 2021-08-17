import { IListener } from "./IListener";

/**
 *
 *
 * @export
 * @interface ITopic
 */
export interface ITopic {
  /**
   *
   *
   * @param {IListener} listener
   * @return {*}  {IListener}
   * @memberof ITopic
   */
  addListener(listener: IListener): IListener

  /**
   *
   *
   * @param {IListener} listener
   * @memberof ITopic
   */
  removeListener(listener: IListener): void;
  
  /**
   *
   *
   * @param {string} event
   * @param {*} data
   * @memberof ITopic
   */
  dispatch(event: string, data: any): void;
}