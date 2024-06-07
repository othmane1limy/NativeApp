import mongoose, { Schema, SchemaTypes } from 'mongoose'


 const MareyeurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    adresse: { type: String, required: true },
    entite: { type: String, required: true },
    typePersonne: { type: String, required: true, enum: ['physique', 'morale'] },
    typeIdentite: { type: String, required: true, enum: ['CNI', 'PASSPORT', 'CT', 'CONTRAT', 'CBA'] },
    NumeroIdentite:{ type: String ,required: true},
    email: { type: String, required: true },
    numeroAutorisation: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  // Création des modèles
  export  const Mareyeur = mongoose.model('Mareyeur', MareyeurSchema);
  
  // Exportation des modèles
  module.exports = { Mareyeur };

