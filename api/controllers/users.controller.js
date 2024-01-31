import User from '../models/user.model.js';



export const getUser =async (req,res)=> {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).send(user)
    } catch (error) {
        console.log(error)
    }
}


export const getUsers =async (req,res)=> {
    try {
        const users = await User.find()
        return res.status(200).send(users)
    } catch (error) {
        console.log(error)
    }
}