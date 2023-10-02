import { Schema, model, models } from "mongoose";

const GroupSchema = new Schema({
    name: {
        type: String,
        reqiured: true,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
});

const Group = models.Group || model("Group", GroupSchema);

export default Group;