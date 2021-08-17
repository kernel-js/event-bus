import { IQueryModifier } from "../../../src/Interfaces"

/**
 *
 *
 * @class QueryModifierFake
 * @implements {IQueryModifier}
 */
export class QueryModifierFake implements IQueryModifier {
  include(includes: string[]): string[] {
    return []
  }
  select(resource: string, fields: string[]): Record<string, string> {
    return {}
  }
  orderBy(columns: string[], direction: 'asc' | 'desc'): string[] {
    return []
  }
  filter(key: string, value: string, group?: string): Record<string, string> {
    return {}
  }

}