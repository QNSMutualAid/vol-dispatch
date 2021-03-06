const Transport = require("winston-transport");
const { sendAlert } = require("../slack/error");

//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
module.exports = class SlackErrorTransport extends Transport {
  // constructor(opts) {
  //   super(opts);
  //   //
  //   // Consume any custom options here. e.g.:
  //   // - Connection information for databases
  //   // - Authentication information for APIs (e.g. loggly, papertrail,
  //   //   logentries, etc.).
  //   //
  // }

  async log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    // Perform the writing to the remote service
    await sendAlert(info);

    callback();
  }
};
