export default class Food {
    constructor (map) {
        this.map = map;
        // 自己创建一个食物
        this.food = document.createElement('div');
        this.food.className = 'food';
        // 插入地图
        this.map.appendChild(this.food)
        // 准备两个变量记录坐标
        this.x = 0;
        this.y = 0;
        this.newFood();
    }
    // 生成随机坐标
    newFood () {
        // 判断横向与纵向坐标能放下多少食物
        const xNum = this.map.clientWidth / 20;
        const yNum = this.map.clientHeight / 20;
        // 出现在坐标内的随机数，食物本身占一格 所以向下取整
        const x = Math.floor(Math.random() * xNum);
        const y = Math.floor(Math.random() * yNum);
        // 实际坐标位置
        this.x = x * 20;
        this.y = y * 20;
        // 赋值
        this.food.style.top = this.y + 'px';
        this.food.style.left = this.x + 'px';
    }
}