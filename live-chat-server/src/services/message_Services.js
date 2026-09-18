import Conversation from "../models/conversation";
import Message from "../models/message.js";
import message from "../models/message.js";

export const addMessage = async ({ conversationId, sender, senderId, content }) => {
  const message = await Message.create({
    conversationId,
    sender,
    senderId,
    content,
  });
  await Conversation.findByIdAndUpdate(conversationId, {
    lastMsgAt: new Date(),
  });
  return message;
};
export const getMessageByConversation = async (conversationId) => {
  return await message.find({ conversationId }).sort({ createdAt: 1 });
};
