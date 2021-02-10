const winston = require('winston')

const logConfiguration = {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "./log.log",
      })
      
    ]
  };

const local_log = winston.createLogger(logConfiguration);
function saveLog(message,level,link){
    var MyLogger =  local_log.log({
          message: message,
          level: [level],
          Date: new Date(),
          http: "localhost:" + 3000 + "/"+link,
        });
      return MyLogger
}
module.exports = {saveLog}