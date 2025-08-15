export interface ICustomer {
    customerId: string;
    fullName: string;
    nationalId: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female';
    customerType: number;
    imageURL: string;
    propertiesCount: string;
    contractsCount: string;
    joiningDate: string;
}
