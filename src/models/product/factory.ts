import Product from "./dto";
import product from "./mysql";

export interface ProductModel {
    getAll(): Promise<Product[]>;
    getOne(id: number): Promise<Product>;
    insert(product: Product): Promise<Product>;
}

export function getProductModel(): ProductModel {
    return product;
}