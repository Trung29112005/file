module.exports.config = {
    name: "tile", //tс╗Й lс╗З hс╗гp nhau
    version: "1.0.1",
    hasPermssion: 0,
    credits: "тЪбя╕ПD-Jukie",
    description: "Xem tс╗Й lс╗З hс╗гp ─С├┤i giс╗пa 2 ng╞░с╗Эi",
    commandCategory: "Giс║гi tr├н",
    usages: "[tag]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("Cс║зn phс║гi tag 1 ng╞░с╗Эi bс║бn muс╗Сn xem tс╗Й lс╗З hс╗гp nhau", event.threadID);
    var name = (await Users.getData(mention)).name
    var namee = (await Users.getData(event.senderID)).name
    var tle = Math.floor(Math.random() * 101);

    var arraytag = [];
        arraytag.push({id: mention, tag: name});
        arraytag.push({id: event.senderID, tag: namee});
    var mentions = Object.keys(event.mentions)

        let Avatar = (await axios.get( `http://le31.glitch.me/fb/avt?q=${mentions}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `http://le31.glitch.me/fb/avt?q=${event.senderID}`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );        


       var imglove = [];
              
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
        var msg = {body: `тЪбя╕ПTс╗Й lс╗З hс╗гp ─С├┤i giс╗пa ${namee} v├а ${name} l├а ${tle}% ЁЯе░`, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID)
      }