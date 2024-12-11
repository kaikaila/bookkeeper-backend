// this is a index.js only for OCR
const { handleMessage, sendMessage } = require("./telegram");
const { errorHandler } = require("./helper");
const { processThereceipt } = require("./OCRReceipt");

async function handler(req, method) {
  try {
    if (method === "GET") {
      const path = req.path;
      const testUrl = "https://i.ibb.co/N7jWr1B/IMG-7686.png";
      if (path === "/test") {
        const data = await processThereceipt(testUrl);
        // return "Success";
        return JSON.stringify(data);
      }
      return "Hello Get";
    }
    const { body } = req;
    if (body && boddy.message) {
      const messageObj = body.message;
      await handleMessage(messageObj); // return axios instantce
      return "Success";
    }
    return "Unknown request";
  } catch (error) {
    errorHandler(error, "mainIndexHandler");
  }
}

module.exports = { handler };
