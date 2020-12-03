interface FormItem {
  [name: string]: {
    initial: any;
    value: any;
    rules: Array<() => boolean | string>;
  };
}
