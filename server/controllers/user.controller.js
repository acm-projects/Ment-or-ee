const User = required ('../models/user.model');
const mongoose = require('mongoose');

// Get all users
const getUsers = async (rep,res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

//Get a single user
const  getUser = async (req, res) => {
    const{id} = req.params   //grap id
    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("404")
        return res.status(404).json({error: `No user with id: ${id}`})
    }

    //const user = await User.findById(id)
    const user = await User.findById(id).select("-password -orderHistory")

    if(!user){
        return res.status(404).json({error: 'no  such User'})
    }
    
    res.status(200).json(user)

}

//post a new user

const creatUser = async( req, res)=>{
    const {username, email, password} = req.body

    try { // add doc to db
        const user = await User.create({username, email, password});
        res.status(200).json(user);
    } catch (error){
        res.status(400).json({error: error.message})
    }
}


// DELETE a user
const deleteUser = async (req, res) => {
    const {id} = req.params // grabs id

    if (!mongoose.Types.ObjectId.isValid(id)) { // check for valid id
        return res.status(404).json({error: 'No such User'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user) {
        return res.status(404).json({error: 'no such User'})
    } 

    res.status(200).json(user)
}

// UPDATE a user
const updateUser = async (req, res) => {
    const {id} = req.params // grabs id

    if (!mongoose.Types.ObjectId.isValid(id)) { // check for valid id
        return res.status(404).json({error: 'No such User'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: 'no such User'})
    } 

    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}