module.exports = {
	// message sending with auto delete
	send: (channel, msg, options, life) => {
		if (typeof options === `number`) {
			life = options;
			options = {};
		}
		return channel.send(msg, options)
			.then(message => {
				if (life > 0) {
					message.delete(life);
				}
			})
			.catch(e => {
				console.log(`[Error] ${e}`);
			});
	},

	log: (type, msg) => {
		let fullMsg = ``;
		switch (type) {
			case `music`:
				fullMsg += `[Music]`;
				break;
			case `command`:
				fullMsg += `[Command]`;
				break;
			case `error`:
				fullMsg += `[Error]`;
				break;
			default:
				fullMsg += `[Generic]`;
		}
		let d = new Date();
		fullMsg += ` (${d.getHours}:${d.getMinutes}) ${msg}`;
		console.log(fullMsg);
	},

	// do two arrays share any values
	// Stolen code shhhh
	/* eslint-disable */
	arrShare: (target, search) => {
		return search.some(function (v) {
			return target.indexOf(v) >= 0;
		});
	}
	/* eslint-enable */
};
