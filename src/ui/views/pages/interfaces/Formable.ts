export interface Formable {
  readonly form: FormItem;
  readonly loading: object;
  isSubmitButtonEnabled: boolean;
  submit (): void;
  cancel (): void;
}
