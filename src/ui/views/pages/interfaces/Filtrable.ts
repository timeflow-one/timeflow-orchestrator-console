export interface Filtrable<T> {
  filters: T;
  isFilteresDefault: boolean;
  clearFitlers: Function;
  onFiltersChanged (value: T): Promise<void>;
}
