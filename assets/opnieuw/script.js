const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5

class Player {
    constructor() {
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = "cyan"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }


    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20
    }

    draw () {
        c.fillStyle = 'Aquamarine'
        c.fillRect(this.position.x , this.position.y, this.width, this.height)
    }
}

const player = new Player()
//platform placement
//+
const platforms = [new Platform({x:350, y: 670}),new Platform({x:1900, y: 100}),new Platform({x:1800, y: 500}),new Platform({x:1400, y: 700}),
new Platform({x:1700, y: 500}),new Platform({x:2400, y: 400}),new Platform({x:2200, y: 400}),
new Platform({x: 1550, y: 200}),new Platform({x: 1400, y: 330}),new Platform({x: 870, y: 300}),new Platform({x: 1000, y: 450}),new Platform({x: 800, y: 600}),new Platform({x: 20, y: 425}),new Platform({x: 200, y: 300}),
new Platform({x: 500, y: 200}), new Platform({x: 900, y: 50}),/* - */ new Platform({x:-300, y: 240}),new Platform({x:-400, y: 650}),new Platform({x:-830, y: 430}),new Platform({x:-640, y: 100}),new Platform({x:-500, y: 500}),
new Platform({x:-2000, y: 400}),new Platform({x:-2400, y: 240}),new Platform({x:-1300, y:100}),new Platform({x:-1000, y: 300}),new Platform({x:-1100, y: 600}),new Platform({x:-1750, y: 470}),new Platform({x:-1680, y: 240}),]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },

    up:{
        pressed: false
    }
}

let scrollOffset = 0

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    

    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100 ){
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
            platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
            platform.position.x += 5
            })
        }
    }

    //platform
    platforms.forEach((platform) => {
if (player.position.y + player.height <= platform.position.y && 
    player.position.y + player.height + player.velocity.y >= platform.position.y &&
    player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0        
    }
})
//win senario
if (scrollOffset > 2000) {
    alert ( 'Good Job! Although to be fair, It wasnt that difficult');
}
if(scrollOffset < -2500){
    alert ('Where the hell are you going???')
}

}

animate()

window.addEventListener('keydown', ({ keyCode }) =>{

    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break

        case 83:
            console.log('down')
            break

        case 68:
            console.log('right')
            keys.right.pressed = true
            break
        
        case 87:
            console.log('up')
            player.velocity.y -= 15
            break

    }
})

window.addEventListener('keyup', ({ keyCode }) =>{

    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break

        case 83:
            console.log('down')
            break

        case 68:
            console.log('right')
            keys.right.pressed = false
            break
    }
})