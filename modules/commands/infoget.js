module.exports.config = {
    name: "infoget",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Xem thông tin của người dùng facebook",
    commandCategory: "Nhóm",
    usages: "[reply/tag/id]",
    cooldowns: 3
    
};
module.exports.run = async function({ api, event, args}) {
const s = require("../../includes/handle/getinfo.js").getinfo;
    var g = await s(event.senderID);
	console.log(g)
        if(g.data == false) return api.sendMessage('Vui lòng sử dụng chậm lại!', event.threadID, event.messageID);
        var name = g.data.name
        var uid = g.data.uid
        var follow = g.data.follow
        var birthday = g.data.birthday
        var gender = g.data.gender
        var hometown = g.data.hometown
        var location = g.data.location.name || null
        var link = g.data.link
        var relationship_status = g.data.relationship_status
        var love = g.data.love.name || null
        var website = g.data.website
        var username = g.data.username
        return api.sendMessage({body:`Tên: ${name}\nID: ${uid}\nFollow: ${follow}\nNgày Sinh: ${birthday}\nGiới tính: ${gender}\nQuê quán: ${hometown}\nĐang sống ở: ${location}\nLiên kết: ${link}\nTrạng thái: ${relationship_status + (love !== null ? ' với ' + love : '')}\nWebsite: ${website}\nUsername: ${username}`, attachment: await this.image(g.data.imgavt)}, event.threadID, event.messageID);
}
module.exports.image = async function(link) {
    const axios = require("axios")
    const { writeFileSync, createReadStream } = require("fs-extra")
    var images = [];
    let download = (await axios.get(link, { responseType: "arraybuffer" } )).data; 
        writeFileSync( __dirname + `/cache/avt.png`, Buffer.from(download, "utf-8"));
        images.push(createReadStream(__dirname + `/cache/avt.png`));
    return images
}
