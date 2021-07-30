import Food from "./food.js";
import Snake from "./snake.js";
export default class Game {
    constructor (ele, score) {
        // 创建地图
        this.map = document.querySelector(ele);
        // 获取计分牌
        this.score = document.querySelector(score);
        // 创建食物
        this.food = new Food(this.map);
        // 创建蛇
        this.snake = new Snake(this.map);
        this.change();
        // 难度级别
        this.level = 7; 
        // 准备变量接收定时器返回值
        this.timer = 0;
        //变量计数
        this.count = 0;
        //防止按键按的太快
        this.isKey = true;
    }
    // 开始游戏
    start () {
        //当死亡后点开始游戏就是重新开始
        if (this.snake.isDie()) this.restart();
        //防止创建多个定时器
        if (this.timer !== 0) return
        this.timer = setInterval(() => {
            this.snake.move();
            //判断蛇吃到食物
            if (this.snake.isEat(this.food)) {
                //积分增加
                this.updateScore();
                //蛇增加长度
                this.snake.creHead();
                //重新生成食物
                this.food.newFood();
            }
            if (this.snake.isDie()) {
                window.alert('game over');
                clearInterval(this.timer);
            }
            this.isKey = false;
        }, 500 - this.level * 50)
    }
    // 暂停游戏
    stop () {
        clearInterval(this.timer);
        this.timer = 0;
    }
    //重新开始
    restart () {
        window.location.reload();
    }
    //修改方向
    change () {
        document.addEventListener('keydown', e => {
            //按键短时间内禁止大量按
            if (this.isKey) return
            this.isKey = true;
            //处理兼容
            e = e || window.event;
            let key ='';
            if (e.key) {
            // onKeyDown，对应的e.key ＝ ‘ArrowDown ArrowUp Enter’等
                key = e.key;
            }else {
                let code = e.which || e.keyCode;
                key = String.fromCharCode(code);
            }
            switch (key) {
                case 'ArrowUp':
                    //蛇移动的方向不应该回头
                    if(this.snake.direction != 'bottom' && this.snake.direction != 'top') {
                        this.snake.direction = 'top';
                    }
                    break;
                case 'ArrowRight': 
                    if(this.snake.direction != 'left' && this.snake.direction != 'right') {
                        this.snake.direction = 'right';
                    }
                    break;
                case 'ArrowDown':
                    if(this.snake.direction != 'top' && this.snake.direction != 'bottom') {
                        this.snake.direction = 'bottom';
                    }
                    break;
                case 'ArrowLeft':
                    if(this.snake.direction != 'right' && this.snake.direction != 'left') {
                        this.snake.direction = 'left';
                    }
                    break;
            }
        })
    }
    //更改记分牌
    updateScore () {
        this.count++;
        this.score.value = this.count * 90 + this.level * 10;
        //判断，当吃到的食物到达一定数量时level++
        if (this.count % 15 === 0) {
            this.level++;
            this.stop();
            this.start();
        }
    }
}