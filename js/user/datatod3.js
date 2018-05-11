/**
 * 将json 数据转化为两个d3支持的数据格式
 * @param {json} data 
 * @returns {Array} [leftnodes,rightnodes]
 */

function datatod3(data) {
	var leftnodes = []
	var rightnodes = []
	var length = data.tbody.length > 21 ? 21 : data.tbody.length
	var smallJson = {}
	var mainIp = ''
	var leftTypes = new Set()
	var rightTypes = new Set()

	for (let i = 0; i < length; i++) {
		for (let j = 0; j < 2; j++) {
			if (smallJson[data.tbody[i][j]]) {
				smallJson[data.tbody[i][j]]++
			} else {
				smallJson[data.tbody[i][j]] = 1
			}
		}
	}

	for (const key in smallJson) {
		if (smallJson.hasOwnProperty(key)) {
			if (smallJson[key] == length) {
				mainIp = key
			}
		}
	}

	data.tbody.forEach(element => {
		if (element[0] == mainIp) {

			rightTypes.add(element[2])
			rightnodes.push({
				"name": element[1],
				"parent": element[2],
				"type": 3
			})
		} else {
			leftTypes.add(element[2])
			leftnodes.push({
				"name": element[0],
				"parent": element[2],
				"type": 3
			})
		}

	});
	leftTypes = [...leftTypes]
	for (let i = 0; i < leftTypes.length; i++) {
		leftnodes.push({
			"name": leftTypes[i],
			"parent": mainIp,
			"type": 2
		})
	}

	rightTypes = [...rightTypes]
	for (let i = 0; i < rightTypes.length; i++) {
		rightnodes.push({
			"name": rightTypes[i],
			"parent": mainIp,
			"type": 2
		})
	}

	leftnodes.push({
		"name": mainIp,
		"parent": '',
		"type": 1
	})

	rightnodes.push({
		"name": mainIp,
		"parent": '',
		"type": 1
	})

	return [leftnodes, rightnodes]
}