const formatUtils = {
    formatTime(time) {
        const totalTime = Math.trunc(time)
        const secondsInAMinute = 60
        const minutesInAnHour = 60

        let hours = Math.trunc(totalTime / (secondsInAMinute * minutesInAnHour))
        let minutes = Math.trunc((totalTime - hours * (secondsInAMinute * minutesInAnHour)) / secondsInAMinute)
        let seconds = Math.trunc(totalTime - (minutes * secondsInAMinute) - (hours * (secondsInAMinute * minutesInAnHour)))

        return this.completeWithZero(hours) + ":" + this.completeWithZero(minutes) + ":" + this.completeWithZero(seconds)
    },
    completeWithZero(number, positions = 1) {
        return (positions >= 0 && number < 10 * positions) ? '0' + number : number
    }
}

export default formatUtils