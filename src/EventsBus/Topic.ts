import { ITopic } from "../Interfaces/EventBus/ITopic";
import { IListener } from "../Interfaces/EventBus/IListener";
import { ITopicOptions } from "../Interfaces/EventBus/ITopicOptions";

/**
 *
 *
 * @export
 * @class Topic
 */
export class Topic implements ITopic {
  /**
   *
   *
   * @private
   * @type {Record<string, IListener[]>}
   * @memberof Topic
   */
  private _listeners: Record<string, IListener[]> = {};

  /**
   *
   *
   * @private
   * @type {Record<string, ITopicOptions[]>}
   * @memberof Topic
   */
  private _queue: Record<string, ITopicOptions[]> = {};

  /**
   * Creates an instance of Topic.
   * @param {string} _identifier
   * @param {ITopicOptions} [_options]
   * @memberof Topic
   */
  constructor(private _identifier: string, private _options?: ITopicOptions) {}

  /**
   *
   *
   * @private
   * @param {string} binding
   * @param {Record<string, ITopicOptions[]>} queue
   * @param {IListener} listener
   * @memberof Topic
   */
  private _consume(binding: string, queue: Record<string, ITopicOptions[]>, listener: IListener) {
    for (var key in queue) {
      if (this._matchWildCard(key, binding)) {
        var messages = queue[key];
  
        for (var item in messages) {
          listener.callback(messages[item]);
        }
  
        queue[key].splice(0, queue[key].length);
      }
    }
  }
  
  /**
   *
   *
   * @private
   * @param {string} str
   * @param {string} rule
   * @return {*}  {boolean}
   * @memberof Topic
   */
  private _matchWildCard(str: string, rule: string ): boolean {
    return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
  }

  /**
   *
   *
   * @param {string} binding
   * @param {Function} callback
   * @return {*} 
   * @memberof Topic
   */
  public addListener(listener: IListener): IListener {
    this._listeners[listener.event] = this._listeners[listener.event] || [];
    this._listeners[listener.event].push(listener);

    if (this._options?.persistent === true) {
      this._consume(listener.event, this._queue, listener);
    }
  
    return listener;
  };

  /**
   *
   *
   * @param {IListener} listener
   * @return {*}  {void}
   * @memberof Topic
   */
  public removeListener(listener: IListener): void {
    let listeners = this._listeners[listener.event] || [];
  
    listeners.map((listenerStored, index) => {
      if (listenerStored === listener) {
        this._listeners[listener.event].splice(index, 1);
        return;
      }
    })
  };
  
  /**
   *
   *
   * @param {string} event
   * @param {*} data
   * @memberof Topic
   */
  public dispatch(event: string, data?: any) {
    let listeners: IListener[] = [];
  
    for (const binding in this._listeners) {
      if (this._matchWildCard(event, binding)) {
        listeners = listeners.concat(this._listeners[binding]);
      }
    }
  
    for (const item in listeners) {
      listeners[item].callback(data);
    }

    if (!listeners.length && this._options?.persistent === true) {
      this._queue[event] = this._queue[event] || [];
      this._queue[event].push(data);
    }
  };
}