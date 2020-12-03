interface FormItem {
  [name: string]: {
    initial: any;
    value: any;
    readonly: boolean;
    rules: Array<() => boolean | string>;
  };
}
