import { OkPacketParams } from 'mysql2';
import ProductDTO from './dto'
import query from '../../db/mysql'

class Product {
    public async getAll(): Promise<ProductDTO[]> {
        const data: ProductDTO[] = await query(`
            select  ProductID as id,
                    ProductName as name,
                    UnitPrice as price,
                    UnitsInStock as stock
            from    products
        `)
        return data;
    }

    public async getOne(id: number): Promise<ProductDTO> {
        const data: ProductDTO = await query(`
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
        const packet: OkPacketParams = await query(`
            insert into products(ProductName, UnitPrice, UnitsInStock) values(?,?,?)
        `, [product.name, product.price, product.stock])
        return this.getOne(packet.insertId);
    }
}

const product = new Product();
export default product;