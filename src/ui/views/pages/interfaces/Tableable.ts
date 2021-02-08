import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'

export interface Tableable <T> {
  readonly tableHeaders: Array<TableHeader>;
  readonly loading: {
    [key: string]: boolean;
  };
  readonly tableOptions: TableOptions;
  tableItems: Array<T>;
  totalItems: number;
  onOptionsChanged (value: TableOptions): void;
  clickOnRow (item: T): void;
}
