import express,{Request,Response} from 'express'
import { Mareyeur } from '../models/Mareyeur/MareyeurModel'
import { AuthRequest } from '../middleware/userMid'
import { Imareyeur } from '../typesMar/InterMar'

//getall
export const Getall=async(req:Request,res:Response)=>{
    const mareyeur= await Mareyeur.find()
    res.send(mareyeur)
}

//getone
export const Getone=async(req:Request,res:Response)=>{
    try{
     const { id } = req.params
    const mareyeur=await Mareyeur.findOne({_id:id})
    if(mareyeur){
        res.send(mareyeur)
    }
    }
    catch(error){
        res.send(error)
    }
    
}


/////create.
export const Create=async(req:AuthRequest,res:Response)=>{

function genererNumeroAutorisation() {
  // Votre logique pour générer un numéro d'autorisation
  return 'AUT-' + Date.now();
}

  try { 
    const { nom, prenom, adresse, entite, typePersonne, typeIdentite,NumeroIdentite, email }:Imareyeur = req.body;
    const user=req.userId
    console.log('user id '+user )
    const numeroAutorisation = genererNumeroAutorisation(); // Implémentez cette fonction selon vos besoins
       
      if (typePersonne === 'physique') {
          if(typeIdentite === 'CNI' || typeIdentite === 'PASSPORT') 
          {const mareyeur = new Mareyeur({ nom, prenom, adresse, entite, typePersonne,NumeroIdentite, typeIdentite, email, numeroAutorisation,user});
          await mareyeur.save();
          res.status(201).send(mareyeur); }
          else{ res.send('error identite')
            typeIdentite :null;}
        } 
        else if (typePersonne === 'morale') {
          if(typeIdentite === 'CONTRAT' || typeIdentite === 'CBA' ||typeIdentite === 'CT')
           { const mareyeur = new Mareyeur({ nom, prenom, adresse, entite, typePersonne, typeIdentite,NumeroIdentite, email, numeroAutorisation,user});
             await mareyeur.save();
            res.status(201).send(mareyeur);}
           else {res.send('error identite')
            typeIdentite :null;}
        }
        else {
          res.send('Type d\'identité non valide pour le type de personne sélectionné')
        } 
      
    
  } catch (error) {
    res.status(500).send(error);
  }
};




///update
export const Update=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const { nom, prenom, adresse, entite, typePersonne, typeIdentite,NumeroIdentite, email } = req.body;
       const result = await Mareyeur.findByIdAndUpdate({_id:id},{$set:{
            nom:nom, prenom:prenom, adresse:adresse, entite:entite, typePersonne:typePersonne, typeIdentite:typeIdentite,NumeroIdentite:NumeroIdentite, email:email,
        }})
        if(result){ 
          return res.send('good')}
        }
        catch(error){
            res.send(error)
        }
}
////delete
export const Delete=async(req:Request,res:Response)=>{
    try{
    const {id}=req.params
    await Mareyeur.deleteOne({_id:id})
    res.send('delete')}
    catch(error){
        res.send(error)
    }
}

function next(arg0: Error) {
    throw new Error('Function not implemented.')
}

///search
 export const searchMar=async(req:Request,res:Response)=>{

    try{
            const searchValue=req.query.q
            const query = { $or: [
              { nom: { $regex: searchValue } },
              { prenom: { $regex: searchValue } },
              { adresse: { $regex: searchValue } },
              { email: { $regex: searchValue } },
              { entite: { $regex: searchValue } },
              { typePersonne: { $regex: searchValue } },
              { typeIdentite: { $regex: searchValue } }
          ]};
      
        
            const result=await Mareyeur.find(query)
            res.status(200).json(result)
    
        
    } catch (error) {
        res.send(error)
    }
 }

