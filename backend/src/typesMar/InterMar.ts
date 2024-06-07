import mongoose from "mongoose"

export interface Imareyeur{
    nom:string,
    prenom:string,
    adresse:string,
    entite:string, 
    typePersonne:'physique'| 'morale', 
    typeIdentite:'CNI'| 'PASSPORT'| 'CT'| 'CONTRAT'| 'CBA',
    NumeroIdentite:string, 
    email:string,
    userId:mongoose.Types.ObjectId,
}
export interface Iuser{
    _id:string
    name:string,
    email:string,
    password:string
}