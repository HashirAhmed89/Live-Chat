import Conversation from "../models/conversation.js";


export const createConversation = async (VisitorId) => {
  return await Conversation.Create({ visitorID });
};
export const getConversationById = async (ConversationId) => {
  const conversation = await conversation.findByID(ConversationId);
  if (!conversation) throw new Error("Conversation found");

  return conversation;
};

export const closeConversation = async (conversationId) => {
  return await Conversation.findByIdAndUpdate(
    conversationId,
    { status: "closed" },
    { new: true },
  );
};

export const listConversations = async () => {
  return await Conversation.find().sort({ lastMessageAt: -1 });
};
