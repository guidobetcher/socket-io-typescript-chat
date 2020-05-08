import {Schema,model} from 'mongoose'

const userSchema: Schema = new Schema({
    name: {type: String, required: true},
    idPiso: {type: String, required: true},
    }
);
export class User {
    constructor(private name: string) {}
}
