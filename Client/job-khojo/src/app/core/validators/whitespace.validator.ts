import { FormControl, ValidationErrors } from '@angular/forms';

export const spaceValidator = (
  control: FormControl
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }

  if (!control.value.trim().length) {
    return { whitespace: true };
  }

  return null;
};
