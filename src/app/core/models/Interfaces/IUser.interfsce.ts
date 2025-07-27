export interface IUser {
    userID?: string;
    username?: string;
    email?: string;
    fullName?: string;
    nationalID?: string;
    dateOfBirth?: string;  // أو Date حسب الاستخدام
    gender?: string;
    imageUrl?: string;
    phoneNumber?: string;  // صححت typo من PhoneNumer إلى phoneNumber
}
