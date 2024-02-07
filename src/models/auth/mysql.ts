import { OkPacketParams } from 'mysql2';
import CredentialsDTO from "./credentials-dto";
import UserDTO from './user-dto';
import query from '../../db/mysql'
import Model from './model';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { hashPassword } from '../../utils/crypto';

class Auth implements Model{
    private async getOne(id: number): Promise<UserDTO> {
        const data: UserDTO = await query(`
            select  userId as id,
                    username,
                    password,
                    firstName,
                    lastName
            from    users
            where   userId = ?
        `, [ id ])
        return data[0];
    }

    private generateJWT(user: UserDTO): string {

        // Container for user object inside the token:
        const container = { user };
    
        // Expiration:
        const options = { expiresIn: "3h" };
    
        // Create token:
        const token = sign(container, config.get<string>('app.secret'), options);
    
        // Return token:
        return token;
    } 

    public async signup(user: UserDTO): Promise<string> {
        const { username, password, firstName, lastName } = user;
        const hashedPassword = hashPassword(password, config.get<string>('app.secret'))
        const packet: OkPacketParams = await query(`
            insert into users(username, password, firstName, lastName, roleId) values(?,?,?,?,1)
        `, [username, hashedPassword, firstName, lastName])
        const newUser = await this.getOne(packet.insertId);
        return this.generateJWT(newUser);
    }

    public async login(credentials: CredentialsDTO): Promise<string | null> {
        const { username, password } = credentials;
        const hashedPassword = hashPassword(password, config.get<string>('app.secret'));
        const user: UserDTO = await query(`
            select  userId as id,
                    username,
                    password,
                    firstName,
                    lastName
            from    users
            where   username = ?
            and     password = ?
        `, [ username, hashedPassword ])
        if(user[0]) {
            return this.generateJWT(user[0]);
        }
        return null; 
    }
}

const auth = new Auth();
export default auth;