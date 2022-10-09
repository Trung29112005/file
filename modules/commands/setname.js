module.exports.config = {
 name: "setname",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Mirai Team",
 description: "Đổi biệt danh trong nhóm của bạn hoặc của người bạn tag hoặc reply tin nhắn",
 commandCategory: "other",
 usages: "[name]",
 cooldowns: 3
};
 
module.exports.run = async function({ api, event, args }) {
 try {
   const name = args.join(" ");
   const mention = Object.keys(event.mentions)[0];
   if (event.type == 'message_reply') {
     return api.changeNickname(`${name}`, event.threadID, event.messageReply.senderID);
   }
   if (!mention) return api.changeNickname(`${name}`, event.threadID, event.senderID);
   if (mention[0]) return api.changeNickname(`${name.replace(event.mentions[mention], "")}`, event.threadID, mention);
 }
 catch (err) {
   return api.sendMessage(err, event.threadID, event.messageID);
 }
}
