// 年月日
export function formatDate(date) {
    const formattedDate = new Date(date);
    const yyyy = formattedDate.getFullYear();
    const mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(formattedDate.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

// 時間
export function formatTime(date) {
    const formattedTime = new Date(date);
    const hours = String(formattedTime.getHours()).padStart(2, '0');
    const minutes = String(formattedTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};
