import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false,
    },
},
    {
        timestamps: true,
    });



/// hashing password before save data in DB

UserSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);

});

const UserModel = model("User", UserSchema);

export default UserModel;