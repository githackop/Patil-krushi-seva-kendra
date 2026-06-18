export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    brand: string;
    type: string;
    price: number;
    stock: number;
    status: "Active" | "Inactive";
    isBestseller: boolean;
}
