import credentialsDTO from './credentials-dto'
import UserDTO from './user-dto'

export default interface Model {
    signup(user: UserDTO): Promise<string>;
    login(credentials: credentialsDTO): Promise<string>;
}
