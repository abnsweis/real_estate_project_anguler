import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { map, Observable, of, switchMap, timer } from "rxjs";


export function usernameExistsValidator(currentUsername: string, authservice: AuthService): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control.value) {
            return of(null);
        }
        if (control.value == currentUsername) {
            return of(null);
        }
        return timer(500).pipe(

            switchMap(() => authservice.checkUsernameExists(control.value)),
            map(exists => (exists ? { existsUsername: true } : null))
        )
    }


} 