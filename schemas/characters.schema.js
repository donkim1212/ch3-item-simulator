import mongoose from "mongoose";

const CharactersSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
    
});

export default mongoose.Model("Characters", CharactersSchema);
