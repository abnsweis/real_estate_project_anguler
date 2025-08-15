import { Pipe, PipeTransform } from "@angular/core";
import { enPropertyStatus } from "../../shared/enums/en-propertyStatus";
import { ca } from "date-fns/locale";

@Pipe({
    name: 'propertyStatusAr',
    standalone: true
})
export class PropertyStatusArPipe implements PipeTransform {
    transform(value: string): { text: string, color: string } {
        switch (Number(value)) {
            case enPropertyStatus.Available:
                return { text: 'متاح', color: 'success' };
            case enPropertyStatus.Rented:
                return { text: 'مؤجر', color: 'warning' };
            case enPropertyStatus.Sold:
                return { text: 'مباع', color: 'danger' };
            default:
                return { text: 'غير معروف', color: 'info' };
        }
    }

}