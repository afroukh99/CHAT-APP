import Message from '../models/message.model.js';



export const createMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        const savedMessage = await newMessage.save()
        return res.status(201).send(savedMessage)
    } catch (error) {
        console.log(error)
    }

}




export const deleteMessages = async(req, res) => {
    const {userId} = req.body
    try {
        await Message.updateMany({conversationId:req.params.convId},{deleted:true,deletedBy:userId})
        return res.status(201).send("Messages deleted successfully!")
      } catch (error) {
        console.log(error)
      }
}


export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.convId })
        res.status(200).send(messages)
    } catch (error) {
        console.log(error)
    }
}


