import { Schema, model } from "mongoose";
import ProjectModel from "./project.model.js";
const taskShema = new Schema({
    text: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
        unique:true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
});

taskShema.post("findOneAndDelete", async task => {
    if (task) {
        await ProjectModel.updateOne({ _id: task.project }, { $pull: { tasks: task._id } });
    }
});

export default model("Task", taskShema);
