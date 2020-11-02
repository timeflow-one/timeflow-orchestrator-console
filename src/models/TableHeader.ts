export interface TableHeader {
  text: string;
  value: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  divider?: boolean;
  class?: string | string[];
  width?: string;
  filter?: (value: any, search: string, item: any) => boolean;
  sort?: (a: any, b: any) => number;
}
