/* Magic Mirror
 * Node Helper: MagicMirrorModule-Oura
 *
 * By Elliott Chenger
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	start: () => {
	},

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "GET_SLEEP") {
			var data = {
				sleepDuration: "5hr 30m",
				sleepScore: 40, 
				readinessScore: 20,
			}
			console.log("ERC DATA: ", data);
			this.sendSocketNotification("SLEEP", data)
			// Send notification
			// this.sendNotificationTest(this.anotherFunction()); //Is possible send objects :)
		}
	},
});
