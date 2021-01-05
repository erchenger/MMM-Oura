/* Magic Mirror
 * Node Helper: MagicMirrorModule-Oura
 *
 * By Elliott Chenger
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const oura = require("oura");
const dateFormat = require("dateformat");


module.exports = NodeHelper.create({

	start: () => {
		this.config = {}
	},
	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function (notification, payload) {
		const self = this;
		if (notification === "CONFIG") {
			self.config = payload
			self.sendSocketNotification("GET_SLEEP")
		}
		if (notification === "GET_SLEEP") {
			const today = new Date();
			const yesterday = new Date(today);
			yesterday.setDate(yesterday.getDate() - 1);
			const todayString = dateFormat(today, "yyyy-mm-dd");
			const yesterdayString = dateFormat(yesterday, "yyyy-mm-dd");
			const ouraClient = new oura.Client(self.config.apiKey);
			const sleepResonse = ouraClient.sleep(yesterdayString, todayString);
			const readinessResponse = ouraClient.readiness(yesterdayString, todayString);
			Promise.all([sleepResonse, readinessResponse]).then(([sleep, readiness]) => {
				const sleepDuration = sleep.sleep[0].total;
				const sleepHrDuration = Math.floor(sleepDuration / 3600);
				const sleepMinsDuration = (sleepDuration % 3600) / 60;
				const hrLabel = sleepHrDuration > 1 ? "hrs" : "hr";
				const minLabel = sleepMinsDuration > 1 ? "mins" : "min";
				const data = {
					sleepDuration: `${sleepHrDuration}${hrLabel} ${sleepMinsDuration}${minLabel}`,
					sleepScore: sleep.sleep[0].score || "?",
					readinessScore: readiness.readiness[0].score || "?",
				}
				self.sendSocketNotification("SLEEP", data)
			}).catch(function (error) {
				console.log(error);
			})
		}
	},
});
