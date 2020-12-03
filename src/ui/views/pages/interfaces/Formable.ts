export interface Formable {
  readonly form: FormItem;
  readonly loading: {
    [key: string]: boolean;
  };
  isEdited: boolean;
  isSubmitButtonEnabled: boolean;
  submit (): void;
  cancel (): void;
}
