console.log(90)

var down_item = document.getElementsByClassName('down_item')[0];
var down_list = document.getElementsByClassName('down_list')[0];
var down_list_flag = false;
down_item.onclick = function() {
    down_list.classList.toggle('on')
    down_list_flag = false;
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}


function MySwipe(option) {
    this.imgBoxs = option.imgBoxs;
    this.silderBox = option.silderBox;
    this.control = option.control;
    this.left = this.control.children[0];
    this.right = this.control.children[1];
    this.body = document.getElementsByClassName('carousel_box')[0];
    this.bodyW = this.body.offsetWidth / 3 / parseInt(getStyle(document.body, 'fontSize'));
    this.index = option.index || 1;
    this.maxIndex;
    this.init();
};
MySwipe.prototype = {
    constructor: MySwipe,
    init: function() {
        this.reSize();
        this.getDir();
        this.listen();
        this.initIndex();
        this.controlBar();
    },
    initIndex: function() {
        var _this = this;
        this.silderBox.style.transform = "translateX(" + (this.bodyW * this.index * -1) + "rem)";
        setTimeout(function() {
            _this.silderBox.style.transition = "0.5s all";
        }, 0);
    },
    listen: function() {
        var _this = this;
        window.onresize = function() {
            _this.reSize();
        };
    },
    reSize: function() {
        this.bodyW = this.body.offsetWidth / 3 / parseInt(getStyle(document.body, 'fontSize'));

        for (var i = 0; i < this.imgBoxs.length; i++) {
            this.imgBoxs[i].style.width = this.bodyW + 'rem';
        };
        this.silderBox.style.width = this.bodyW * i + 'rem';
        this.maxIndex = i - 1;
    },
    getDir: function() {
        var startX, startY;
        var startTime;
        var _this = this;
        this.silderBox.addEventListener("touchstart", function(e) {
            if (e.targetTouches.length > 1) {
                return;
            }
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;

            startTime = Date.now();
        });
        this.silderBox.addEventListener("touchend", function(e) {
            if (e.changedTouches.length > 1) {
                return;
            }
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            var endTime = Date.now();
            var direction;
            if (Math.abs(endX - startX) > 15) {
                // 判断方向 水平
                direction = endX > startX ? "right" : "left";
            } else if (Math.abs(endY - startY) > 5) {
                // 判断方向 竖直方向
                direction = endY > startY ? "down" : "up";
            } else {
                return;
            }
            if (endTime - startTime > 500) {
                return;
            }
            console.log(direction)
            _this.result(direction);
            // return this.silderBox;
        });
    },
    controlBar: function() {
        var _this = this;
        this.right.addEventListener('click', function(e) {
            // console.log('right');
            e.stopPropagation();
            _this.result('right')
        });
        this.left.addEventListener('click', function(e) {
            // console.log('left');
            e.stopPropagation();
            _this.result('left')

        })
    },
    result: function(direction) {
        var _this = this;
        if (direction == 'left') {
            this.index++;
            if (this.index > this.maxIndex - 2) {
                this.index = this.maxIndex - 2;
                this.silderBox.style.transform = "translateX(" + (this.bodyW * this.index * -1 - this.bodyW / 10) + "rem)";
                setTimeout(function() {
                    _this.silderBox.style.transform = "translateX(" + (_this.bodyW * _this.index * -1) + "rem)";
                }, 200);
            } else {
                this.silderBox.style.transform = "translateX(" + (this.bodyW * this.index * -1) + "rem)";
            }
        };
        if (direction == 'right') {
            this.index--;
            if (this.index < 0) {
                this.index = 0;
                this.silderBox.style.transform = "translateX(" + (this.bodyW / 10) + "rem)";
                setTimeout(function() {
                    _this.silderBox.style.transform = "translateX(" + 0 + "rem)";
                }, 200);
            } else {
                this.silderBox.style.transform = "translateX(" + (this.bodyW * this.index * -1) + "rem)";
            }
        }
    }
};



window.onload = function() {
    var carousel_box = document.getElementsByClassName('carousel')[0];
    var carousel = document.getElementsByClassName('carousel')[0].children;
    var test = new MySwipe({
        imgBoxs: carousel,
        silderBox: carousel_box,
        control: control
    })
}