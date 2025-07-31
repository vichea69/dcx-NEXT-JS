export const formatMyDate = (date) => {

    if (!date) return "Invalid Date"; // Handle null or undefined values gracefully
    const parsedDate = new Date(date); // Convert to Date Object
    if (isNaN(parsedDate)) return "Invalid date";  // Check if the date is invalid

    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(parsedDate);

}
export const formatDuration = (duration) => {
    if (!duration) return null;

    var hour = Math.floor(duration / 3600);
    var min = Math.floor(duration % 3600 / 60);
    var sec = Math.floor(duration % 3600 % 60);

    const durationString = `${hour}:${min}:${sec}`;
    return durationString;
}