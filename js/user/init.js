/**
 * 生成 d3 实例，调用 stylePosition 生成坐标
 * 生成 text g path 标签，并对坐标点进行微调
 * 并对相应节点绑定事件
 * @param {object} nodes 
 * @param {string} position 
 */
function init(nodes, position) {
    var root = d3.stratify()
        .id(function (d) {
            return d.name;
        })
        .parentId(function (d) {
            return d.parent;
        })

    var data = root(nodes)
    d3.cluster().size([850, 860])(data)
    stylePosition(data, position)

    var diagonal = d3.diagonal().projection(function (d) {
        return [d.y, d.x]
    });
    if (position == '#right') {
        var g = d3.select(position)
        g.selectAll(".solidPath")
            .data(data.descendants().slice(1))
            .enter()
            .append("path")
            .attr("class", "solidPath")
            .attr("d", function (d) {
                d.data.path = this

                if (d.data.type == 2) {
                    return diagonal({
                        source: {
                            x: d.x + 16,
                            y: d.y - 5
                        },
                        target: {
                            x: d.parent.x + 7,
                            y: d.parent.y
                        }
                    });
                }

                if (d.data.type == 3) {
                    return diagonal({
                        source: {
                            x: d.x + 7,
                            y: d.y - 6
                        },
                        target: {
                            x: d.parent.x + 15,
                            y: d.parent.y + 200
                        }
                    });
                }

            });
    } else {

        var g = d3.select(position)
        g.selectAll(".solidPath")
            .data(data.descendants().slice(1))
            .enter()
            .append("path")
            .attr("class", "solidPath")
            .attr("d", function (d) {
                d.data.path = this

                if (d.data.type == 2) {
                    return diagonal({
                        source: {
                            x: d.x + 16,
                            y: d.y + 200
                        },
                        target: {
                            x: d.parent.x + 7,
                            y: d.parent.y + 0
                        }
                    });
                }

                if (d.data.type == 3) {
                    return diagonal({
                        source: {
                            x: d.x + 7,
                            y: d.y - 6
                        },
                        target: {
                            x: d.parent.x + 15,
                            y: d.parent.y
                        }
                    });
                }
            });
    }


    var node = g.selectAll(".node")
        .data(data.descendants())
        .enter()
        .append("g")
        .attr("class", function (d) {
            d.data.el = this
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        })
        .on("mouseover", (node) => {
            mouseOver(node, position)
        })
        .on('mouseout', (node) => {
            mouseOut(node)
        })

    node.append('path')
        .attr('style', (d) => {
            if (d.data.type !== 2) return ''
            return "fill: black"
        })
        .attr('d', (d) => {
            if (d.data.type !== 2) return ''
            return 'M0 0 L180 0 L200 15 L180 30 L0 30 Z'
        })

    node.append("text")
        .attr("y", (d) => {
            if (d.data.type == 1) {
                if (position == '#left') return -15
                else return 45
            }
            if (d.data.type == 2) return 22
            else return 12
        })
        .attr("x", (d) => {
            if (d.data.type == 1) {
                if (position == '#left') return -12
                else return -3
            } else return 12
        })
        .attr('class', (d) => {
            if (d.data.type == 1) return 'fatherFont'
            if (d.data.type == 2) return 'typeFont'
            if (d.data.type == 3) return 'MouseOutText'
        })
        .text(function (d) {
            if (d.data.type == 1) {
                if (position == '#left') return '目的'
                else return '源'
            } else return d.id
        })

    if (position == '#right') {
        node.append("circle")
            .attr("r", (d) => {
                if (d.data.type == 1) return 10
                else if (d.data.type == 2) return 0
                else if (d.data.type == 3) return 4
            })
            .attr("cx", 5)
            .attr("cy", 8)
            .attr('class', (d) => {
                if (d.data.type == 1) return 'blueCirle'
                else return 'ring'
            })
    } else {
        node.append("circle")
            .attr("r", (d) => {
                if (d.data.type == 1) return 10
                else if (d.data.type == 2) return 0
                else if (d.data.type == 3) return 4
            })
            .attr("cx", (d) => {
                if (d.data.type == 3) return d.data.el.querySelector('text').getBBox().width + 18
                else return 5
            })
            .attr("cy", 8)
            .attr('class', (d) => {
                if (d.data.type == 1) return 'pinkCirle'
                else return 'ring'
            })
    }
    if (position == '#left') {
        leftPosition(data)
        createIpNode(data.id)

    }
    translate(data, position)
}