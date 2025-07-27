import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from "../../core/services/auth.service";
import { map, Observable, of, switchMap, timer } from "rxjs";

export function emailExistsValidator(currentEmail: string, authService: AuthService): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null);  // ما في قيمة، مش لازم نتحقق
        }
        if (control.value == currentEmail) {
            return of(null);
        }
        return timer(500).pipe(  // تأخير 500ms (debounce)
            switchMap(() => authService.checkEmailExists(control.value)),  // نطلب للسيرفر هل البريد موجود؟
            map(exists => (exists ? { emailExists: true } : null))  // إذا موجود، نرجع خطأ، غير هيك لا
        );
    };
}