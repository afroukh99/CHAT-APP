import Conversation from '../models/conversation.model.js';



export const createConversation = async (req, res) => {

  const conversation = await Conversation.findOne({ members: { $all: [req.body.senderId, req.body.receiverId] } })
  if (conversation) { return res.status(403).send(" you are already in a conversation") }
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  })

  try {
    const savedConv = await newConversation.save()
    return res.status(201).send(savedConv)
  } catch (error) {
    console.log(error)
  }
}




export const deleteConversation = async (req, res) => {

  try {
    await Conversation.findByIdAndDelete(req.params.id)
    return res.status(201).send("Conversation deleted successfully!")
  } catch (error) {
    console.log(error)
  }
}


export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ members: { $in: [req.params.id] } })
    return res.status(200).send(conversations)
  } catch (error) {
    console.log(error)
  }
}


export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
    return res.status(200).send(conversation)
  } catch (error) {
    console.log(error)
  }
}