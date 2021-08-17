import { IEventBus } from "../Interfaces/EventBus/IEventBus";
import { ITopic } from "../Interfaces/EventBus/ITopic";
import { ITopicOptions } from "../Interfaces/EventBus/ITopicOptions";
import { Topic } from "./Topic";

/**
 *
 *
 * @export
 * @class EventBus
 */
export class EventBus implements IEventBus {
  /**
   * Creates an instance of EventBus.
   * @param {*} _topics
   * @param {*} 
   * @param {*} ITopic
   * @param {*} []
   * @memberof EventBus
   */
  constructor(private _topics: ITopic[] = []) {}

  /**
   *
   *
   * @param {string} identifier
   * @param {ITopicOptions} [options]
   * @return {*}  {ITopic}
   * @memberof EventBus
   */
  public getTopic(identifier: string, options?: ITopicOptions): ITopic {
    if (!this._topics[identifier]) {
      this._topics[identifier] = new Topic(identifier, options);
    }
  
    return this._topics[identifier];
  };

  /**
   *
   *
   * @return {*}  {ITopic[]}
   * @memberof EventBus
   */
  public getTopics(): ITopic[] {
    return this._topics;
  };
}
