
// 把iview的时间转成正常的时间格式
export const transformTime = (time) => {
    let formatTime = new Date(time);
    let y = formatTime.getFullYear();
    let m = formatTime.getMonth() + 1;
    let d = formatTime.getDate();
    return `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
}



// 格式化多级公司，部门或岗位
class GetFormat {
    // 通过type对获取的初始化的值分类
    classifyList(list) {
        let levelList = {};
        list.forEach(item => {
            if (item.type in levelList) {
                levelList[item.type].push(item);
            } else {
                levelList[item.type] = [];
                levelList[item.type].push(item);
            }
        });
        return levelList;
    }
    // 给对象的key排序
    sortKey(obj) {
        let newKey = Object.keys(obj).sort();
        let newObj = {};
        for (let item of newKey) {
            newObj[item] = obj[item];
        }
        return newObj;
    }
    // 获取格式化好的值
    getFormat() {
        console.log('thisresult',this.result);
        let levelList = this.classifyList( this.result);
        console.log("levelList", levelList);
        let sortList = this.sortKey(levelList);
        console.log("sortList", sortList);
        let classifyList = [];
        if (sortList[this.ind]) {
            sortList[this.ind].forEach(item => {
                classifyList.push(item);
            });
        }

        const fun = item => {
            item.children.forEach(item1 => {
                let childrens = [];
                sortList[item1.ind].forEach(child => {
                    child.ind = item1.ind + 1;
                    if (item1.value === child.pid) {
                        childrens.push(child);
                    }
                });
                item1.children = childrens;
                if (item1.ind < Object.keys(sortList).length) {
                    fun(item1);
                }
            });
        };
        if (Object.keys(sortList).length > 1) {
            classifyList.forEach(item => {
                let childrens = [];
                sortList[this.ind + 1].forEach(child => {
                    if (item.value === child.pid) {
                        child.ind = this.ind + 2;
                        childrens.push(child);
                    }
                });
                item.children = childrens;
                if (Object.keys(sortList).length > 2) {
                    fun(item);
                }
            });
        }
        
        return classifyList;
    }
    constructor(result,ind){
        this.result = result;
        this.ind = ind;
        return this.getFormat();
    }

}

export const getFormat=(result,ind)=> new GetFormat(result,ind);

