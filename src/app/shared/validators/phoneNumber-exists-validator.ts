import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { map, Observable, of, switchMap, timer } from "rxjs";

export function phoneNumberExistsValidator(cuurentPhoneNumber: string, authService: AuthService): AsyncValidatorFn {

    console.log(cuurentPhoneNumber);
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null);  // ما في قيمة، مش لازم نتحقق
        }
        if (control.value == cuurentPhoneNumber) {
            return of(null);
        }
        return timer(500).pipe(  // تأخير 500ms (debounce)
            switchMap(() => authService.checkPhoneNumberExists(control.value)),
            map(exists => (exists ? { phoneNumberExists: true } : null))
        );

    }

}