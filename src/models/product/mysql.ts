import { OkPacketParams } from 'mysql2';
import ProductDTO from './dto'

export default class Product {
    public execute: Function;
    public constructor(execute: Function) {
        this.execute = execute;
    }

    public async getAll(): Promise<ProductDTO[]> {
        const data: ProductDTO[] = await this.execute(`
            select  ProductID as id,
                    ProductName as name,
                    UnitPrice as price,
                    UnitsInStock as stock
            from    products
        `)
        return data;
    }

    public async getOne(id: number): Promise<ProductDTO> {
        const data: ProductDTO = await this.execute(`
            select  ProductID as id,
                    ProductName as name,
                    UnitPrice as price,
                    UnitsInStock as stock
            from    products
            where   ProductID = ?
        `, [ id ])
        return data;
    }

    public async insert(product: ProductDTO): Promise<ProductDTO> {
        const packet: OkPacketParams = await this.execute(`
            insert into products(ProductName, UnitPrice, UnitsInStock) values(?,?,?)
        `, [product.name, product.price, product.stock])
        return this.getOne(packet.insertId);
    }
}