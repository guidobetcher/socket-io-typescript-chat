import {Schema, model} from "mongoose";

const ListChat: Schema = new Schema({
    idPiso: {type:String, required: true, unique: true},
    messages:[{
        nameUser : String,
        message: String,
        date: Date
    }]

});

export default (model('Chat', ListChat))
