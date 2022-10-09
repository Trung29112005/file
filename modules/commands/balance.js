module.exports.config = {
  name: "balance",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Kiểm tra số tiền của bản thân hoặc người được tag/reply",
  commandCategory: "economy",
  usages: "[Tag]",
  cooldowns: 0
};

module.exports.languages = {
  "vi": {
    "sotienbanthan": "Số tiền bạn đang có: %1$",
    "sotiennguoikhac": "Số tiền của %1 hiện đang có là: %2$"
  },
  "en": {
    "sotienbanthan": "Your current balance: %1$",
    "sotiennguoikhac": "%1's current balance: %2$."
  }
}

module.exports.run = async function({ api, event, args, Currencies, getText, Users}) {
  const { threadID, messageID, senderID, mentions } = event;
  const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
   if (event.messageReply) { 
    let nameMoney = await Users.getNameUser(event.messageReply.senderID);
    const money = (await Currencies.getData(event.messageReply.senderID)).money;
    return api.sendMessage({body: getText("sotiennguoikhac", nameMoney, money), attachment: await image()}, threadID, messageID);
  }
  else if (!args[0] && !event.messageReply) {
    const money = (await Currencies.getData(senderID)).money;
    return api.sendMessage({body: getText("sotienbanthan", money), attachment: await image()}, threadID, messageID);
  }
  else if (Object.keys(event.mentions).length == 1) {
    var mention = Object.keys(mentions)[0];
    var money = (await Currencies.getData(mention)).money;
    if (!money) money = 0;
    return api.sendMessage({
      body: getText("sotiennguoikhac", mentions[mention].replace(/\@/g, ""), money),
      mentions: [{
        tag: mentions[mention].replace(/\@/g, ""),
        id: mention
      }],
            attachment: await image()
    }, threadID, messageID);
  }

  else return global.utils.throwError(this.config.name, threadID, messageID);
  async function image() {
        var images = [];
        var link = [`https://i.imgur.com/00qVExR.jpg`,`https://i.imgur.com/YS09RLF.png`,`https://i.imgur.com/ky4qDKX.png`,`https://i.imgur.com/T4xn0yf.png`,`https://i.imgur.com/RvE8xij.png`,`https://i.imgur.com/HKwctpT.png`];
        let download = (await axios.get(link[Math.floor(Math.random() * link.length)], { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync( __dirname + `/cache/coins.png`, Buffer.from(download, "utf-8"));
        images.push(fs.createReadStream(__dirname + `/cache/coins.png`));
        return images
    }
}
