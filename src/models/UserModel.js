import { BaseModel } from './BaseModel';

export class UserModel extends BaseModel {
    constructor(user) {
        super();
        this.name = user.name;
        this.email = user.email;
    }
}