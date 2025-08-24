import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { map, Observable, of, switchMap, tap, timer } from "rxjs";
import { CustomersService } from "../../core/services/customers.service";


export function customerExistsByNationalIdValidator(currentNationalId: string, customersService: CustomersService): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) {
            return of(null);
        }
        if (control.value == currentNationalId) {
            return of(null);
        }
        return timer(500).pipe(

            switchMap(() => customersService.checkCustomerExistsByNationalId(control.value)),
            map((response: any) => {
                return (response.exists ? null : { existsCustomer: true });
            })
        )
    }


} 