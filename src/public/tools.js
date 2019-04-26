
// 把iview的时间转成正常的时间格式
export const transformTime = (time) => {
    let formatTime = new Date(time);
    let y = formatTime.getFullYear();
    let m = formatTime.getMonth() + 1;
    let d = formatTime.getDate();
    return `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
}


