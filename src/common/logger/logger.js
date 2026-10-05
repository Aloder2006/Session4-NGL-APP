class Logger {
    constructor() {
        if (!Logger.instance) {
            Logger.instance = this;
        }
        return Logger.instance;
    }

    

    log(level, message, metaData={}){
        let messageOj = {
            level: level,
            message: message,
            timestamp: new Date().toISOString(),
            ...metaData
        }
        console.log(JSON.stringify(messageOj));
    }

    error(message, metaData={}){
        this.log("ERROR", message, metaData);
    }

    info(message, metaData={}){
        this.log("INFO", message, metaData);
    }

    debug(message, metaData={}){
        this.log("DEBUG", message, metaData);
    }

    
}

export const logger = new Logger();