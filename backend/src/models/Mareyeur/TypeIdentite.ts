import mongoose, { Schema, Document } from 'mongoose';

export interface ITypeIdentite extends Document {
  name: string;
  typePersonneId: mongoose.Types.ObjectId;
}

const TypeIdentiteSchema: Schema = new Schema({
  name: { type: String, required: true, enum: ['CNI', 'PASSPORT', 'CONTRAT', 'CBO'] },
  typePersonneId: { type: Schema.Types.ObjectId, ref: 'TypePersonne', required: true },
});

export default mongoose.model<ITypeIdentite>('TypeIdentite', TypeIdentiteSchema);