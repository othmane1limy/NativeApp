import mongoose, { Schema, Document } from 'mongoose';

export interface ITypePersonne extends Document {
  name: string;
}

const TypePersonneSchema: Schema = new Schema({
  name: { type: String, required: true, enum: ['physique', 'morale'] },
});

export default mongoose.model<ITypePersonne>('TypePersonne', TypePersonneSchema);