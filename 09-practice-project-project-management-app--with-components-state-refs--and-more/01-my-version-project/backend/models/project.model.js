import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export default model("Project", projectSchema);
