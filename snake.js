export default class Snake {
    constructor (map) {
        this.map = map;
        // 蛇
        this.snake = [];
        // 方向
        this.direction = 'right';
        // 初始化一个蛇
        this.creSnake();
    }
    // 计算舌头出现的坐标位置
    pos () {
        const head = this.snake[0];
        // 没有头，直接出现在0 0位置上
        if (!head) return { left: 0, top: 0 };
        // 有头，根据方向来计算
        const obj = { left: head.offsetLeft, top: head.offsetTop };
        switch (this.direction) {
            case 'top': obj.top -= 20; break;
            case 'right': obj.left += 20; break;
            case 'bottom': obj.top += 20; break;
            case 'left': obj.left -= 20; break;

        }
        return obj;
    }
    // 给蛇加一个头
    creHead () {
        const pos = this.pos();
        // 判断原先是不是有头
        const head = this.snake[0];
        if (head) head.className = 'body';
        const div = document.createElement('div');
        div.className = 'head';
        div.style.top = pos.top + 'px';
        div.style.left = pos.left + 'px';
        this.snake.unshift(div);
        this.map.appendChild(div);
    }
    // 初始化一个蛇
    creSnake () {
        for (let i = 0; i < 3; i++) {
            this.creHead();
        }
    }
    // 蛇移动一格
    move () {
        const body = this.snake.pop();
        body.remove();
        this.creHead();
    }
    // 判断死亡
    isDie () {
        const head = this.snake[0];
        const x = head.offsetLeft;
        const y = head.offsetTop;
        // 判断蛇是否撞到边界
        if (x < 0 || y < 0 || x >= this.map.clientWidth || y >= this.map.clientHeight) {
            return true;
        } else {
            // 判断是不是撞到自己身体
            const tmp = this.snake.slice(1);
            return tmp.some(item => {
                return x === item.offsetLeft && y === item.offsetTop
            })
        }
 
    }
    // 判断吃到食物
    isEat (food) {
        const x = this.snake[0].offsetLeft;
        const y = this.snake[0].offsetTop;
        if (x === food.x && y === food.y) {
            return true;
        } else {
            return false;
        }
    }

}