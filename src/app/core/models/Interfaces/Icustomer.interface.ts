export interface ICustomer {
    customerId: string;
    fullName: string;
    nationalId: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female';
    customerType: 'Buyer' | 'Seller' | 'Lessee' | 'Lessor';
    imageURL: string;
}
