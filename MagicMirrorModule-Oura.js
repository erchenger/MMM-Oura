/* global Module */

/* Magic Mirror
 * Module: MagicMirrorModule-Oura
 *
 * By Elliott Chenger
 * MIT Licensed.
 */

Module.register("MagicMirrorModule-Oura", {
  defaults: {
    // interval: 3600,
    interval: 15,
    apiKey: ""
  },

  requiresVersion: "2.1.0", // Required version of MagicMirror
  socketNotificationReceived: function (notification, payload) {
    if (notification === "SLEEP") {
      this.sleep = payload;
      this.updateDom();
    }
  },

  start: function () {
    const self = this;
    self.sendSocketNotification("CONFIG", self.config);
    const seconds = this.config.interval * 1000;
    window.setInterval(function () {
      self.sendSocketNotification("CONFIG", self.config);
      self.sendSocketNotification("GET_SLEEP");
    }, seconds);
  },
  getDom: function () {
    var self = this;
    //Scores Row
    var scoresRow = document.createElement("tr");
    scoresRow.className = "oura-scores";

    //Readiness Score
    var readinessScoreContainer = document.createElement("th");
    var readinessScore = document.createTextNode(
      this.sleep.readinessScore || "?"
    );
    readinessScoreContainer.appendChild(readinessScore);
    scoresRow.appendChild(readinessScoreContainer);

    // Sleep Score
    var sleepScoreContainer = document.createElement("th");
    var sleepScore = document.createTextNode(this.sleep.sleepScore || "?");
    sleepScoreContainer.appendChild(sleepScore);
    scoresRow.appendChild(sleepScoreContainer);

    // Sleep Duration
    var sleepDurationContainer = document.createElement("th");
    var sleepDuration = document.createTextNode(
      this.sleep.sleepDuration || "?"
    );
    sleepDurationContainer.appendChild(sleepDuration);
    scoresRow.appendChild(sleepDurationContainer);

    //Labels Row
    var labelsRow = document.createElement("tr");
    labelsRow.className = "oura-lables";

    //Readiness Label
    var readinessLabelContainer = document.createElement("th");
    var readinessLabel = document.createTextNode("Readiness");
    readinessLabelContainer.appendChild(readinessLabel);
    labelsRow.appendChild(readinessLabelContainer);

    //Sleep Label
    var sleepLabelContainer = document.createElement("th");
    var sleepLabel = document.createTextNode("Sleep");
    sleepLabelContainer.appendChild(sleepLabel);
    labelsRow.appendChild(sleepLabelContainer);

    var sleepDurationLabelContainer = document.createElement("th");
    var sleepDurationLabel = document.createTextNode("Duration");
    sleepDurationLabelContainer.appendChild(sleepDurationLabel);
    labelsRow.appendChild(sleepDurationLabelContainer);

    var table = document.createElement("table");
    table.className = "oura-table";
    table.appendChild(scoresRow);
    table.appendChild(labelsRow);

    var wrapper = document.createElement("div");
    wrapper.appendChild(table);
    return wrapper;
  },

  getScripts: function () {
    return [];
  },

  getStyles: function () {
    return ["MagicMirrorModule-Oura.css"];
  },

  // Load translations files
  getTranslations: function () {
    //FIXME: This can be load a one file javascript definition
    return {
      en: "translations/en.json",
      es: "translations/es.json"
    };
  }
});
