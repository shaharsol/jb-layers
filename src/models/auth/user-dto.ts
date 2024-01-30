import CredentialsDTO from './credentials-dto';

export default interface DTO extends CredentialsDTO{
    id: number;
    firstName: string;
    lastName: string;
}