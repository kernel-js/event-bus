import { ITopic } from "./ITopic";
import { ITopicOptions } from "./ITopicOptions";

/**
 *
 *
 * @export
 * @interface IEventBus
 */
export interface IEventBus {
  /**
   *
   *
   * @param {string} identifier
   * @param {ITopicOptions} [options]
   * @return {*}  {ITopic}
   * @memberof IEventBus
   */
  getTopic(identifier: string, options?: ITopicOptions): ITopic

  /**
   *
   *
   * @return {*}  {ITopic[]}
   * @memberof IEventBus
   */
  getTopics(): ITopic[];

  /**
   *
   *
   * @param {string} identifier
   * @return void
   * @memberof IEventBus
   */
  deleteTopic(identifier: string): void
}