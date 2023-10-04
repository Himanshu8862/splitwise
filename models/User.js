import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        reqiured: true,
        unique: true,
    },
    name: {
        type: String,
        reqiured: true,
    },
    password: {
        type: String,
        reqiured: true,
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;