module.exports.config = {
  name: "ptr",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Trung Kiên mod by Kaneki",
  description: "",
  commandCategory: "Hình Ảnh",
  usages: "boobs",
  cooldowns: 5
};

module.exports.run = async ({ api, event, Currencies}) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 0) {
  axios.get('https://www.phamvandienofficial.xyz/pinterest?search=nude').then(res => {
  var video = res.data.data;
        let count = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️Video sex gái xinh cực đã đây`,
            attachment: fs.createReadStream(__dirname + `/cache/ptr.jpg`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/ptr.jpg`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/ptr.jpg`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 0})
      })
  } else return api.sendMessage("Bạn cần 1000000 đô",event.threadID,event.messageID);
}