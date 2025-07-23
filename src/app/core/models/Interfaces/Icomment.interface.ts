export interface IComment {
    commentID: string;
    propertyId: string;
    userId: string;
    username: string;
    fullName: string;
    commentText: string;
    imageURL: string;
    createdDate: string; // أو Date إذا بدك تعالجها ككائن وقتي
}
