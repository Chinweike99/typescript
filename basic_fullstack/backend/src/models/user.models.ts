import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
};

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date }
}, {
    timestamps: true
  })


export const userValidationSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email("Email is required"),
    password: z.string().min(8).max(50),
});


export const loginValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
  });

  
  export const emailValidationSchema = z.object({
    email: z.string().email(),
  });


  export const resetPasswordValidationSchema = z.object({
    password: z.string().min(8).max(50),
    token: z.string(),
  });
  
//   const User = mongoose.model<IUser>('User', userSchema);
//   export default User;

  export default mongoose.model<IUser>('User', userSchema);

