/**
 * 根据所传的 position 来调用相应的函数
 * @param {object} data 
 * @param {string} position 
 */
function stylePosition(data, position) {
    switch (position) {
        case '#left':
            toLeft(data)
            break;
        case '#right':
            toRight(data)
            break;
    }
}

/**
 * 计算每一个在 #left svg 内的元素的坐标值，
 * 和每一个元素所应旋转的角度
 * @param {object} data 
 */
function toLeft(data) {
    var left = 850
    data.x = 390
    data.y = 780

    var n = data.children.length
    var top = (500 - n * 30) / 2
    data.children[0].x = 100 + top
    data.children[0].y = 650 - 160
    for (let i = 1; i < n; i++) {
        top += 32
        data.children[i].y = 650 - 160
        data.children[i].x = 100 + top
    }

    var sonArray = []
    data.children.forEach(element => {
        sonArray.push(...element.children)
    });
    var deg = 30
    step = 30
    long = 400
    var alldeg = 60
    while (sonArray.length > 0) {
    
        sonArray[0].y = Math.abs(left-(80 + long * Math.cos(Math.PI / 180 * deg)))
        sonArray[0].x = 400 - 600 * Math.sin(Math.PI / 180 * deg)
        sonArray[0].deg = deg
    
        deg = deg - alldeg / step
        if (deg <= -alldeg/2) {
            long = long + 100
            alldeg += 5
            deg = alldeg/2
            step += 10
        }
        sonArray.shift()
    }
}


/**
 * 计算每一个在 #right svg 内的元素的坐标值，
 * 和每一个元素所应旋转的角度
 * @param {object} data 
 */
function toRight(data) {
    data.y = 10
    data.x = 440
    var n = data.children.length
    var top = (500 - n * 30) / 2
    data.children[0].x = 100 + top
    data.children[0].y = 160
    for (let i = 1; i < n; i++) {
        top += 32
        data.children[i].y = 160
        data.children[i].x = 100 + top
    }

    var sonArray = []
    data.children.forEach(element => {
        sonArray.push(...element.children)
    });
    var deg = 30
    step = 30
    long = 400
    var alldeg = 60
    while (sonArray.length > 0) {

        sonArray[0].y = 40 + long * Math.cos(Math.PI / 180 * deg)
        sonArray[0].x = 400 - 600 * Math.sin(Math.PI / 180 * deg)
        sonArray[0].deg = deg

        deg = deg - alldeg / step
        if (deg <= -alldeg/2) {
            long = long + 100
            alldeg += 5
            deg = alldeg/2
            step += 10
        }
        sonArray.shift()
    }
}

/**
 * 对每一个元素的所有元素进行相应角度的旋转
 * @param {object} data 
 * @param {string} position 
 */
function translate(data, position) {
    data.children.forEach((element) => {
        
        element.children.forEach((el) => {
            var old = el.data.el.getAttribute('transform')
            var deg = 0
            if (position == '#left') deg = el.deg.toString() + ", 65 0 "
            else deg = -el.deg
            el.data.el.setAttribute('transform', `${old} rotate(${deg})`)
        })
    })
}

/**
 * 对每一个在 #left svg 内的三级子元素进行坐标的再偏移
 * @param {object} data 
 */
function leftPosition(data){
    data.children.forEach((element) => {

        element.children.forEach((el) => {
            var x = el.x * 1.025 - 10
            var y = el.y - el.data.el.getBBox().width - 20           
            el.data.el.setAttribute('transform', `translate(${y} ${x})`)
        })
    })
}

/**
 * 生成一个唯一的一个根节点 
 */
function createIpNode(ip) {
    var left = document.getElementById('left')
    var text = document.createElementNS('http://www.w3.org/2000/svg' , 'text')
    var g = document.createElementNS('http://www.w3.org/2000/svg','g')
    text.setAttribute('x', '12')
    text.setAttribute('y', '12')
    text.setAttribute('class', 'ipClass')
    text.innerHTML = ip
    g.appendChild(text)
    left.appendChild(g)
    var width = g.getBBox().width
    g.setAttribute('transform' , `translate(${773 - (width / 2)}, 415)`)
}