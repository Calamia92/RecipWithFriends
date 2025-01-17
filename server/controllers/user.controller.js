const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        res.send(user);
    } catch (err) {
        console.log('ID unknown : ' + err);
        res.status(500).send('Erreur serveur');
    }
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }

    const updateFields = {};
    if (req.body.nom) updateFields.nom = req.body.nom;
    if (req.body.prenom) updateFields.prenom = req.body.prenom;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.telephone) updateFields.telephone = req.body.telephone;

    try {
        
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!updatedUser) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        res.send(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.deleteUser = async (req,res)=>{
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }
    try{
        await UserModel.deleteOne({_id: req.params.id}).exec();
        res.status(200).json({message: "Successfully deleted."})
    } catch(err){
        return res.status(500).json({ message: err.message });
    }
}