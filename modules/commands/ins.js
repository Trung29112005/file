module.exports.config = {
	name: "insinfo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Võ Thành Trung",
	description: "",
	commandCategory: "Group",
	usages: "",
	cooldowns: 0
};

module.exports.run = function ({
	event,
	args,
	api,
	getText
}) {
	var typeuid = args[0];
	if (!typeuid) return api.sendMessage(`Vui lòng nhập url cần lấy uid!`, event.threadID, event.messageID);
	else {
		const axios = require('axios');
		axios.get(`https://manhict.tech/v1/igStalk?username=${typeuid}&apikey=mzk_L33DN3Y6DRISA0ZYTHX`).then(res => {
			return api.sendMessage(`Họ Và Tên Đầy Đủ: ${res.data.fullname}\nUsername: ${res.data.username}\nSố Bài Viết Đã Đăng: ${res.data.post}\nSố Người Theo Dõi: ${res.data.followers}\nĐang Theo Dõi Người Khác: ${res.data.following}\nTiểu Sử: ${res.data.bio}`, event.threadID, event.messageID);
		});
	}
}