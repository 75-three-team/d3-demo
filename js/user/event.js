function mouseOver(node, string) {
    if (node.data.type !== 2) return
    var pathclass = ''
    var circleClass = ''
    if (string == '#left') {
        node.data.el.querySelector('path').setAttribute('style', 'fill:#EA5F5E;')
        pathclass = 'pinkPath';
        circleClass = 'smallPinkCircle'
    } else {
        node.data.el.querySelector('path').setAttribute('style', 'fill:#0799CC;')
        pathclass = 'bluePath'
        circleClass = 'smallBlueCircle'
    }
    if (node.children && node.children.length >= 0) {
        node.children.forEach(element => {
            var node = element.data.el.querySelector('circle')
            node.setAttribute('class', circleClass)

            var path = element.data.path
            path.setAttribute('class', pathclass)

            var text = element.data.el.querySelector('text')
            text.setAttribute('class', 'MouseOverText')
        });
    }

    node.data.path.setAttribute('class', pathclass)
}

function mouseOut(node) {
    if (node.data.type !== 2) return
    if (node.children && node.children.length >= 0) {
        node.children.forEach(element => {
            var node = element.data.el.querySelector('circle')
            node.setAttribute('class', 'ring')

            var path = element.data.path
            path.setAttribute('class', 'solidPath')

            var text = element.data.el.querySelector('text')
            text.setAttribute('class', 'MouseOutText')
        });
    }

    node.data.el.querySelector('path').setAttribute('style', 'fill:black;')
    node.data.path.setAttribute('class', 'solidPath')
}