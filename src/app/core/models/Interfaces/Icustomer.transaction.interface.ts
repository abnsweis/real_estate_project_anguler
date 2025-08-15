export interface ICustomerTransaction {
    transactionId: string;
    customerId: string;
    propertyNumber: string;
    transactionType?: string;
    propertyId?: string;
    amount?: number;
    transactionDate?: string;
    notes?: string;
}
