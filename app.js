// 引入外部模块和文件
const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const { db } = require("./db/db"); // 引入 MongoDB 配置
const { processTheReceipt } = require("./controllers/OCR/OCRReceipt"); // 引入 OCRReceipt 模块
require("dotenv").config(); // 加载 .env 文件中的环境变量

// 初始化 Express 应用
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json()); // 解析请求体中的 JSON 数据
app.use(cors()); // 启用跨域资源共享（CORS）

// 动态引入路由模块
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

// Veryfi API 路由
app.post("/api/v1/parse-receipt", async (req, res) => {
  try {
    const { imageUrl } = req.body; // 获取请求中的图片 URL

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    // 调用 processTheReceipt 解析收据
    const parsedData = await processTheReceipt(imageUrl);

    // 返回解析结果
    res.status(200).json(parsedData);
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: "Failed to parse receipt" });
  }
});

// 测试路由
app.get("/", (req, res) => {
  res.send("Hello, World");
});

// 启动服务器
const server = () => {
  db(); // 连接数据库
  app.listen(PORT, () => {
    console.log("You are listening to port:", PORT);
  });
};

server();
