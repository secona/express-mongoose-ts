import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  name?: string | null;
  dateOfBirth?: Date | null;
}

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: String,
    dateOfBirth: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
