/* Description:
 *   Allows setting a schedule on a corsica server to call specific commands during certain intervals.
 *
 * Dependencies:
 *   Brain, Command
 *
 * Configuration:
 *   None
 */
var Promise = require('es6-promise').Promise;

module.exports = function (corsica) {
    var settings = corsica.settings.setup('scheduler', {
        entries: [
            {
                command: "https://charliehoehn.com/wp-content/uploads/2012/12/1305828451-floor-minimalistic-dark-pattern-wood-patterns-wallpaper.jpg",
                startHour: 9,
                duration: 1
            }
        ]
    });

    corsica.on('content', function (content) {
        return settings.get().then(function (settings) {
            return corsica.brain.get("break-" + content.screen).then(shouldBreak => {
                if (shouldBreak) {
                    corsica.brain.set("break-" + content.screen, false);
                    return content;
                }

                if (typeof settings !== "undefined") {
                    if (typeof settings.entries !== "undefined") {
                        settings.entries.forEach(element => {
                            var now = new Date();

                            var before = new Date();
                            before.setHours(element.startHour);
                            before.setMinutes(0);

                            var after = new Date();
                            after.setHours(element.startHour + element.duration);
                            after.setMinutes(0);

                            if ((before < now) && (now < after)) {
                                var result = corsica.parseCommand(element.command, content);

                                corsica.brain.set("break-" + content.screen, true);

                                corsica.sendMessage(result.type, result.message);
                            }
                        });
                    }
                }

                return content;
            });
        });
    });
};
