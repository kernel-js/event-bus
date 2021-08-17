import { IPaginate, IQueryBuilder } from "../../../src/Interfaces";

/**
 *
 *
 * @class QueryBuilderFake
 * @implements {IQueryBuilder}
 */
export class QueryBuilderFake implements IQueryBuilder {
  addIncludes(includes: string[]): void {
    return;
  }
  addFields(fields: Record<string, string>): void {
    return;
  }
  addFilters(filters: Record<string, string>): void {
    return;
  }
  addSort(sorts: string[]): void {
    return;
  }
  addPagination(pagination: IPaginate): void {
    return;
  }
  getQuery(): string {
    return ''
  }
  resetQuery(): void {
    return;
  }
}