export interface ProductVm {
    iD: number;
    name: string;
    code: string;
    tag: string;
    decription: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
    image7: string;
    image8: string;
    image9: string;
    image10: string;
    price: number | null;
    promotionPrice: number | null;
    gender: string;
    weight: number | null;
    size: string;
    includeVAT: boolean | null;
    quantity: number;
    publishYear: number | null;
    brandName: string;
    brandID: number | null;
    productCategoryName: string;
    materialName: string;
    detail: string;
    warranty: number | null;
    status: boolean | null;
    viewCount: number | null;
    sellerCount: number | null;
    wishCount: number | null;
    productStatus: number | null;
    starRating: number | null;
}