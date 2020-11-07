interface FormItem {
  [name: string]: {
    value: any;
    rules: Array<() => boolean | string>;
  };
}
