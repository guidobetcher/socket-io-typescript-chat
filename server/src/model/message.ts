import {Schema, model} from 'mongoose';
import DateTimeFormat = Intl.DateTimeFormat;

const MessageSchema: Schema = new Schema({
    chat: {type: String, required: true},
    from: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    date: {type: DateTimeFormat, required: false}
    }
);

export default model('Message', MessageSchema);
