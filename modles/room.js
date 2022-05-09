import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: "C2C",
  CONSUMER_TO_SUPPORT: "C2S",
};

const chatRoomSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    userIds: Array,
    type: String,
    chatInitiator: String,
  },
  {
    timestamps: true,
    collection: "rooms",
  }
);

/**
 * @param {String} userId 
 * @return {Array} 
 */
chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
  try {
    const rooms = await this.find({ userIds: { $all: [userId] } });
    return rooms;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} roomId
 * @return {Object}
 */
chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
  try {
    const room = await this.findOne({ _id: roomId });
    return room;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {Array} userIds 
 * @param {String} chatInitiator -
 * @param {CHAT_ROOM_TYPES} type
 */
chatRoomSchema.statics.initiateChat = async function (userIds, type, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving chats',
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new room',
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log('error ', error);
    throw error;
  }
}

export default mongoose.model("Room", chatRoomSchema);