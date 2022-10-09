module.exports.config = {
	name: "fbcoverv1", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "Hack05", // Công nhận module sở hữu là ai
	description: "tạo banner thông qua thông tin mà bạn cung cấp", // Thông tin chi tiết về lệnh
	commandCategory: "general", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "",
	cooldowns: 5
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
	const { threadID, messageID, senderID, body } = event;
	if (handleReply.content.id != senderID) return;
	const input = body.trim();
	const sendC = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
		global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
		api.unsendMessage(handleReply.messageID);
		global.client.handleReply.push({
			step: step,
			name: this.config.name,
			messageID: info.messageID,
			content: content
		})
	}, messageID);
	const send = async (msg) => api.sendMessage(msg, threadID, messageID);

	let content = handleReply.content;
	switch (handleReply.step) {
		case 1:
			content.name = input;
			sendC("Reply tin nhắn này để ghi ngày tháng năm sinh", 2, content);
			break;
		case 2:
			content.ngaysinh = input;
			sendC("Reply tin nhắn này để ghi mối quan hệ của bạn", 3, content);
			break;
		case 3:
			content.rela = input;
			sendC("Reply tin nhắn này để chọn màu", 4, content);
			break;
		case 4:
			content.location = input;
			sendC("Reply tin nhắn này để ghi quê quán của bạn", 5, content);
			break;
		case 5:
			content.quequan = input;
			sendC("Reply tin nhắn này để ghi số follow", 6, content);
			break;
		case 6:
			content.sofl = input;
			sendC("Reply tin nhắn này để ghi giới tính", 7, content);
			break;
		case 7:
			content.gender = input;
			sendC("Reply tin nhắn này để xác nhận làm baner", 8, content);
			break;
		case 8:
			content.noiden = input;
			sendC("Reply tin nhắn này để ghi quê quán", 9, content);
			break;
		case 9:
			content.color = input;
			const axios = require("axios");
			const fs = require("fs");
			send("Thông tin đã được ghi nhận, vui lòng đợi trong giây lát!");
			global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
			api.unsendMessage(handleReply.messageID);
			let c = content;
			let res = await axios.get(encodeURI(`https://www.phamvandienofficial.xyz/fbcover/v3?uid=${c.id}&name=${c.name}&birthday=${c.ngaysinh}&love=${c.rela}&location=${c.noiden}&hometown=${c.quequan}&follow=${c.sofl}&gender=${c.gender}&color=red`), { responseType: "arraybuffer" })
				.catch(e => { return send("Lỗi không xác định, liên hệ admin để fix") });
			if (res.status != 200) return send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
			let path = __dirname + `/cache/fbcoverv1__${senderID}.png`;
			fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
			send({
				body: 'Ảnh của bạn đây',
				attachment: fs.createReadStream(path)
			}).then(fs.unlinkSync(path));
			break;
		default:
			break;
	}
}

module.exports.run = ({ api, event, args }) => {
	const { threadID, messageID, senderID } = event;
	return api.sendMessage("Reply tin nhắn này tên của bạn", event.threadID, (err,info) => {
		global.client.handleReply.push({
			step: 1,
			name: this.config.name,
			messageID: info.messageID,
			content: {
				id: senderID,
				name: "",
				ngaysinh: "",
				rela: "",
				location: "",
				quequan: "",
				sofl: "",
				gender: "",
				noiden: "",
				color: ""
			}
		})
		console.log(global.client.handleReply)
	}, event.messageID);
}