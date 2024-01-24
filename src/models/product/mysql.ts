import { OkPacketParams } from 'mysql2';
import DTO from './dto'
import query from '../../db/mysql'
import Model from './model';

class Product implements Model{
    public async getAll(): Promise<DTO[]> {
        const data: DTO[] = await query(`
            select  ProductID as id,
                    ProductName as name,
                    UnitPrice as price,
                    UnitsInStock as stock
            from    products
        `)
        return data;
    }

    public async getOne(id: number): Promise<DTO> {
        const data: DTO = await query(`
            select  ProductID as id,
                    ProductName as name,
                    UnitPrice as price,
                    UnitsInStock as stock
            from    products
            where   ProductID = ?
        `, [ id ])
        return data;
    }

    public async insert(product: DTO): Promise<DTO> {
        const packet: OkPacketParams = await query(`
            insert into products(ProductName, UnitPrice, UnitsInStock) values(?,?,?)
        `, [product.name, product.price, product.stock])
        return this.getOne(packet.insertId);
    }
}

const product = new Product();
export default product;