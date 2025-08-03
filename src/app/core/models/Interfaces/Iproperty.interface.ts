export interface IProperty {
    propertyId: string;
    title: string;
    ownerId: string;
    categoryId: string;
    propertyNumber: number;
    price: number;
    location: string;
    address: string;
    propertyStatus: string;
    area: number;
    rating: number;
    videoUrl: string | null;
    description: string;
    categoryName: string;
    ownerFullName: string;
    ownerNationalId: string;
    mainImage: string;
    images: string[];
}
