export const hasTokenExpired = (user) => {
    if (user) {
        const { time_stamp, expire_time, token } = user;
        if (!token || !time_stamp) {
            return false
        }
        const millisecondsElapsed = Date.now() - Number(time_stamp); // Get the elapsed time by subtracting the current timestamp to the timestamp that the accessToken has been created on the localStorage.
        return (millisecondsElapsed) > Number(expire_time)    // Convert the elapsed milisec to sec and compare to the expireTime (3600 sec)
    }
}

export const remainingTimeBeforeTokenExpiry = (expire_time, elapsed) => {
    const remaining = expire_time - elapsed
    
    var minutes = Math.floor((remaining / (1000 * 60)) % 60),
        hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + " hour/s & " + minutes + " minute/s";
}