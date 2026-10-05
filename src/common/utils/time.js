export function toMs(time, unit){
    switch(unit){
        case "seconds":
            return time * 1000;
        case "minutes":
            return time * 60 * 1000;
        case "hours":
            return time * 60 * 60 * 1000;
        case "days":
            return time * 24 * 60 * 60 * 1000;
        default:
            return time;
    }
}

export function toSec(time, unit){
    switch(unit){
        case "seconds":
            return time;
        case "minutes":
            return time * 60;
        case "hours":
            return time * 60 * 60;
        case "days":
            return time * 24 * 60 * 60;
        default:
            return time;
    }
}
