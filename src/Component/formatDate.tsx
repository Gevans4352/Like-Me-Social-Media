
export const formatMemberSince = (dateString: string | undefined) => {
    if (!dateString){
        return "Member since recently";
    } 
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
        return "Member since recently";
    }
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `Member since ${month} / ${day} / ${year}`;
}