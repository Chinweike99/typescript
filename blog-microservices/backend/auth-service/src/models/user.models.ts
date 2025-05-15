import mongoose from "mongoose";
import { User } from '../../../shared/src/types/types'


const userSchema = new mongoose.Schema<User & Document>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, {
    timestamps: true,
  });
  

userSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user.password;
    return user;
}

export const UserModel = mongoose.model<User & Document>("User", userSchema);