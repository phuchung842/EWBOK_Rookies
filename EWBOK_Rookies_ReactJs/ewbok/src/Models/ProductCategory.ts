export interface ProductCategoryVm {
    iD: number;
    name: string;
    metaTitle: string;
    displayOrder: number | null;
    status: boolean;
    showOnHome: boolean | null;
}