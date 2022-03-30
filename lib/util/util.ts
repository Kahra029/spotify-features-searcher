export const msToTime = function (duration_time: number) {
    var m = Math.floor(duration_time / 1000 / 60) % 60
    var s = ('00' + (Math.floor(duration_time / 1000) % 60)).slice(-2)
    return `${m}:${s}`
}