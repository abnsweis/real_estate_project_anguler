import { enCustomerType } from "../enums/en-customerType";


export class Utilities {


    static getCustomerTypeArabicLabel(value: number): string {
        switch (value) {
            case enCustomerType.Owner:
                return 'مالك';
            case enCustomerType.Buyer:
                return 'مشتري';
            case enCustomerType.Renter:
                return 'مستأجر';
            default:
                return 'نوع غير معروف';
        }
    }
    static getCustomerTypeArOptions() {
        return [
            { label: 'مالك', value: enCustomerType.Owner },
            { label: 'مشتري', value: enCustomerType.Buyer },
            { label: 'مستأجر', value: enCustomerType.Renter }
        ];;
    }
}