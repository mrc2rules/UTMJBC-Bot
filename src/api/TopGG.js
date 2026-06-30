const {topggToken} = require("../../config/config.json");
const {AutoPoster} = require("topgg-autoposter");

module.exports = function (bot) {
    if (topggToken && topggToken.trim() !== '') {
        const poster = AutoPoster(topggToken, bot);
        poster.on("error", _ => {
        })
        console.log("Posting stats to topGG!")
    } else {
        console.log("No topGG token!")
    }
}
