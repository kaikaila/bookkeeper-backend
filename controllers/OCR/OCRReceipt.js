const axios = require("axios");
const { errorHandler } = require("./errorHanler");

async function processTheReceipt(fileUrl) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      file_url: fileUrl, // 收据图片 URL
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.veryfi.com/api/v8/partner/documents",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "CLIENT-ID": process.env.OCR_VERIFY_CLIENT_ID, // 从 .env 加载
        AUTHORIZATION: `apikey ${process.env.OCR_VERIFY_USERNAME}:${process.env.OCR_VERIFY_API_KEY}`, // 从 .env 加载
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        let parsedData = null;
        if (response && response.data) {
          parsedData = parseTheData(response.data);
        }
        resolve(parsedData);
      })
      .catch((ex) => {
        errorHandler(ex, "processTheReceipt", "axios");
        reject(ex);
      });
  });
}

function parseTheData(data) {
  let finalData = {
    bill_date: new Date(data.date),
    items: [],
    payment: data.payment,
    reference_number: data.reference_number,
    total: data.total,
    vendor: {
      address: data.vendor?.address,
      name: data.vendor?.raw_name,
    },
  };
  if (data.line_items) {
    data.line_items.forEach((item) => {
      finalData.items.push({
        name: item.description,
        total: item.total,
        quantity: item.quantity,
        price: item.price,
      });
    });
  }
  return finalData;
}

module.exports = { processTheReceipt };
