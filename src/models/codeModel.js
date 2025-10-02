import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const codeSchema = new Schema({
    language: {
        type: String,
        required: [true, "Please Select a language"],
    },
    code: {
        type: String,
        required: [true, "Enter Code to proceed"],
    },
    output: {
        type: String || undefined,
    },
    error: {
        type: String || undefined,
    },
    userId: {
        type: String,
        required: [true, "SignUp before proceeding"],
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const ExecutedCode = mongoose.models.ExecutedCode || mongoose.model("ExecutedCode", codeSchema);

export default ExecutedCode;
