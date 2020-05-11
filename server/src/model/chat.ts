import {Schema, model} from "mongoose";

const ChatSchema: Schema = new Schema({
    idPiso: {type:String, required: true, unique: true},
    messages:[{type:Schema.Types.ObjectId, ref: 'Message'}]
});

export default model('Chat', ChatSchema);
