module.exports.config = {
	name: "banspam",
	version: "1.0.0",
	hasPermssion: 0, 
	credits: "NTKhang",
	description: "tự động ban người dùng nếu spam bot 10 lần/1 phút",
	commandCategory: "ban người dùng",
	usages: "x",
	cooldowns: 5
};

module.exports. run = ({api, event}) => {
  return api.sendMessage("tự động cấm người dùng nếu spam bot 10 lần/1 phút", event.threadID, event.messageID);
};

module.exports.handleEvent = async ({ Users, api, event}) => {
	const fs = require("fs-extra");
	const moment = require("moment-timezone");
	
  let { senderID, messageID, threadID } = event;
  const so_lan_spam = 8; // số lần spam, vượt quá sẽ bị ban
  const thoi_gian_spam = 60000; // 60000 millisecond (1 phút)
  const unbanAfter = 1800000; // 3600000 millisecond (1 tiếng) 
  const folderRandomImage = __dirname + "/cache/randomImgAutobanUser";
  const allImage = fs.readdirSync(folderRandomImage);
  if (!global.client.autoban) global.client.autoban = {};
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };
  
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = threadSetting.PREFIX || global.config.PREFIX;
	if (!event.body || event.body.indexOf(prefix) != 0) return;
	
	let dataUser = await Users.getData(senderID) || {};
	let data = dataUser.data || {};
	
	if ((global.client.autoban[senderID].timeStart + thoi_gian_spam) <= Date.now()) {
	  global.client.autoban[senderID] = {
	    timeStart: Date.now(),
	    number: 0
	  }
	}
	else {
	  global.client.autoban[senderID].number++;
	  if (global.client.autoban[senderID].number >= so_lan_spam) {
	    const time = moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY HH:mm:ss");
			if (data && data.banned == true) return;
			data.banned = true;
			data.reason = `spam bot ${so_lan_spam} lần/${thoi_gian_spam/60000}phút`;
			data.autoban = {
			  timeStart: Date.now(),
			  unbanAfter
			};
			data.dateAdded = time;
			await Users.setData(senderID, { data });
			global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
			global.client.autoban[senderID] = {
	      timeStart: Date.now(),
	      number: 0
	    };
  		api.sendMessage({
  		  body: senderID + " | " + dataUser.name + `\ > Bạn đã bị ban không thể sử dụng bot ${unbanAfter/60000}phút với lý do: spam bot 10 lần/1 phút\> Hãy đợi sau ${Math.floor(unbanAfter/60000)}phút bạn có thể sử dụng lại bot`,
  		  attachment: fs.createReadStream(`${folderRandomImage}/${allImage[Math.floor(Math.random()*allImage.length)]}`)}, threadID, () => {
  		    setTimeout(async function() {
  		      delete data.autoban;
      	    data.banned = false;
      			data.reason = null;
      			data.dateAdded = null;
      			await Users.setData(senderID, { data });
      			global.data.userBanned.delete(senderID);
  		    }, unbanAfter);
  		  });
  		for (let idAdmin of global.config.ADMINBOT) {
  		  api.sendMessage("Kích hoạt chế độ autoban người dùng " + senderID + " | " + dataUser.name + ` vì spam bot ${so_lan_spam} lần/1 phút\nHãy đợi sau ${Math.floor(unbanAfter/60000)}phút bạn có thể sử dụng lại bot\Thời gian: ` + time, idAdmin);
		  };
	  }
	}
};

//gửi all admin
// FIX ERROR
module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": " thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": " success!",
  }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["autoban"] == "undefined" || data["autoban"] == true) data["autoban"] = false;
  else data["autoban"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["autoban"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}