import {User} from './user';
import {Schema, model} from 'mongoose';
import DateTimeFormat = Intl.DateTimeFormat;

const MessageSchema: Schema = new Schema({
    from: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: DateTimeFormat, required: false}
    }
);
export class Message {
    constructor(private from: User, private content: string) {}
}
