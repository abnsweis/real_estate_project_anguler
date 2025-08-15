import { Pipe, PipeTransform } from "@angular/core";
import { enPropertyStatus } from "../../shared/enums/en-propertyStatus";
import { ca } from "date-fns/locale";
import { enTransactionType } from "../../shared/enums/en-transaction-type";

@Pipe({
    name: 'transactionTypeAr',
    standalone: true
})
export class TransactionTypeArPipe implements PipeTransform {
    transform(value: string | undefined): { text: string, color: string } {
        switch (Number(value)) {
            case enTransactionType.Sale:
                return { text: 'بيع', color: 'danger' };
            case enTransactionType.Buy:
                return { text: 'شراء', color: 'success' };
            case enTransactionType.Rent:
                return { text: 'تأجير', color: 'warning' };
            case enTransactionType.Lease:
                return { text: 'أستأجار', color: 'info' };
            default:
                return { text: 'غير معروف', color: 'secondary' };
        }
    }

}