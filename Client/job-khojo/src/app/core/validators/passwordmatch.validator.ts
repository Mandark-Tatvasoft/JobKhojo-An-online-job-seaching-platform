import { FormControl, ValidationErrors } from '@angular/forms';

export const confirmPasswordValidator = (
  control: FormControl
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }

  const passwordControl = control.root.get('password');
  if (!passwordControl) {
    return null;
  }

  if (control.value !== passwordControl.value) {
    return { passwordsDontMatch: true };
  }

  return null;
};
