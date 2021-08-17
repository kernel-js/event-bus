import { IHandling, IJsonApiResponse, IModel } from "../../../src/Interfaces";

/**
 *
 *
 * @class HandlingFake
 * @implements {IHandling}
 */
export class HandlingFake implements IHandling {
  hydrate<T extends IModel>(that: T, response: IJsonApiResponse): T | T[] {
    return []
  }
  unserialize(response: IJsonApiResponse): Record<string, any> {
    return {}
  }
  serialize(model: IModel) {
    const data: { id: string | number, type?: string } = {
      id: NaN,
      type: undefined,
    };

    data.id = model.id;
    data.type = model.type || model.resourceName;

    return JSON.stringify(data);
  }

}