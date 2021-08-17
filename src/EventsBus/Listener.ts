import { IListener } from "../Interfaces/EventBus/IListener";

/**
 *
 *
 * @export
 * @class Listener
 */
export class Listener implements IListener {
  /**
   * Creates an instance of Listener.
   * @param {string} event
   * @param {(data: any) => void} callback
   * @memberof Listener
   */
  constructor(public event: string, public callback: (data: any) => void) {}
}
