import { getAxiosInstance } from "./axios";
const { errorHandler } = require("./errorHanler");

const MY_TOKEN = "";
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axioInstance = getAxiosInstance(BASE_URL);

function sendMessage(chatId) {
  return axioInstance
    .get("sendMessage", {
      chat_id: chatId,
      text: messageText,
    })
    .catch((ex) => {
      errorHandler(ex, "sendMessage", "axios");
    });
}
async function handleMessage(messageObj) {
  const messageText = messageObj.text || "";
  if (!messageText) {
    errorHandler("No message text", "handdleMessage");
    return "";
  }

  try {
    const chatId = messageObj.chat.id;
    if (messageText.charAt(0) === "/") {
      const command = messageText.substring(1);
      switch (command) {
        case "start":
          return sendMessage(chatId, "I'm a bot to help you sort your bills");
        default:
          return sendMessage(chatId, "Sorry, I don't know this command");
      }
    } else {
      return sendMessage(chatId, messageText);
    }
  } catch (error) {
    errorHandler(error, "handleMessage");
  }
}

module.exports = { sendMessage, handleMessage };
