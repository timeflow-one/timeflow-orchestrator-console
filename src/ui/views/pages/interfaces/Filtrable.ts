export interface Filtrable<T> {
  isFilteresDefault: boolean;
  clearFitlers: Function;
  onFiltersChanged (value: T): Promise<void>;
}
