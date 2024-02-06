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
                    UnitsInStock as stock,
                    ImageName as imageName
            from    products
        `)
        return data;
    }

    public async getOne(id: number): Promise<DTO> {
        const data: DTO = await query(`
            select  ProductID as id,
                    ProductName as name,
                    UnitPrice as price,
                    UnitsInStock as stock,
                    ImageName as imageName
            from    products
            where   ProductID = ?
        `, [ id ])
        return data[0];
    }

    public async insert(product: DTO): Promise<DTO> {
        const packet: OkPacketParams = await query(`
            insert into products(ProductName, UnitPrice, UnitsInStock, imageName) values(?,?,?,?)
        `, [product.name, product.price, product.stock, product.imageName])
        return this.getOne(packet.insertId);
    }
}

const product = new Product();
export default product;