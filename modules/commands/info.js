module.exports.config = {
    name: "info",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Xem thông tin của người dùng facebook",
    commandCategory: "Nhóm",
    usages: "[reply/tag/id]",
    cooldowns: 3
    
};
module.exports.run = async({api,event,args}) => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios'];  

    if(!args[0]){
    if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
   const res = await axios.get(`https://nguyenmanh.name.vn/api/fbInfo?id=${uid}&apikey=8J2sR88y`);  
    var gender = res.data.gender == 'Nam' ? "Nam" : res.data.gender == 'Nữ' ? "Nữ" : "Không công khai";
    var birthday = res.data.birthday ? `${res.data.birthday}` : "..";
    var love = res.data.relationship  ? `${res.data.relationship}` : "Độc Thân"
    var henho = res.data.love  ? `${res.data.love}` : " "
	var hometown = res.data.hometown ? `${res.data.hometown}` : "Không công khai"
    var url_profile = res.data.url_profile  ? `${res.data.profileUrl}` : `${url_profile}`
    var callback = () => api.sendMessage({body:`👤Tên: ${res.data.name}\n🔎UID: ${uid}\n👀Follow: ${res.data.follow}\n👭 Giới tính: ${gender}\n🎉 Sinh Nhật: ${birthday}\n💌 Mối quan hệ: ${love} ${henho}\n🌏Đến từ: ${hometown}\n📌URL cá nhân: ${url_profile}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
   }

    else {
    if (args.join().indexOf('@') !== -1){
    var mentions = Object.keys(event.mentions)
    const res = await axios.get(`https://nguyenmanh.name.vn/api/fbInfo?id=${mentions}&apikey=8J2sR88y`);  
    var gender = res.data.gender == 'male' ? "Nam" : res.data.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.birthday ? `${res.data.birthday}` : "...";
     var love = res.data.LeAnhTruong_User_Love ? `${res.data.LeAnhTruong_User_Love}` : "Độc Thân"
    var location = res.data.location ? `${res.data.location}` : "..."
	var hometown = res.data.hometown ? `${res.data.hometown}` : "Không công khai"
    var url_profile = res.data.url_profile  ? `${res.data.url_profile}` : `${url_profile}`
    var callback = () => api.sendMessage({body:`👤Tên: ${res.data.fullname}\n🔎UID: ${uid}\n👀Follow: ${res.data.follow_user}\n👭 Giới tính: ${gender}\n🎉 Sinh Nhật: ${birthday}\n💌 Mối quan hệ: ${love}\n🏡 Sống tại: ${location}\n🌏Đến từ: ${hometown}\n📌URL cá nhân: ${url_profile}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
    else {
    const res = await axios.get(`https://nguyenmanh.name.vn/api/fbInfo?id=${args[0]}&apikey=8J2sR88y`);  
    var gender = res.data.gender == 'male' ? "Nam" : res.data.gender == 'female' ? "Nữ" : "Không công khai";
    var birthday = res.data.birthday ? `${res.data.birthday}` : "...";
     var love = res.data.relationship_status ? `${res.data.relationship_status}` : "Độc Thân"
    var location = res.data.location ? `${res.data.location}` : "..."
	var hometown = res.data.hometown ? `${res.data.hometown}` : "Không công khai"
    var url_profile = res.data.url_profile  ? `${res.data.url_profile}` : `${url_profile}`
     var callback = () => api.sendMessage({body:`👤Tên: ${res.data.name}\n🔎UID: ${uid}\n👀Follow: ${res.data.summary.total_count}\n👭 Giới tính: ${gender}\n🎉 Sinh Nhật: ${birthday}\n💌 Mối quan hệ: ${love}\n🏡 Sống tại: ${location}\n🌏Đến từ: ${hometown}\n📌URL cá nhân: ${url_profile}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${args[0]}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback());
    }
  }
}