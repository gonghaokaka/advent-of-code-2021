import * as fs from 'fs';

const data = fs.readFileSync("./Day9/q9.txt", "utf8")
    .toString().split("\r\n")
    .reduce((res, curr) => {
        return [...res, curr.split("").map((el) => +el)]
    }, [])


function checkIsLow(curr, surr){
    let res = true
    for (let s of surr){
        if (s <= curr){
            res = false
        }
    }
    return res
}

const height = data.length
const width = data[0].length

function getLowPoints() {
    let lowPoints = []
    for (let i=0; i < data.length; i+=1){
        for (let j=0; j<data[i].length; j+=1){
            let surrs = []
            // check left
            if (j > 0){
                surrs.push(data[i][j-1])
            }
            // check right
            if (j < width - 1){
                surrs.push(data[i][j+1])
            }
            // check up 
            if (i > 0){
                surrs.push(data[i-1][j])
            }
            // check down
            if (i < height - 1){
                surrs.push(data[i+1][j])
            }
            if (checkIsLow(data[i][j], surrs)) {
                lowPoints.push([i,j])
            }
        }
    }
    return lowPoints
}

const result1 = getLowPoints().reduce((res, cords) => {
    return res + data[cords[0]][cords[1]] + 1
}, 0)
console.log(result1)


// eslint-disable-next-line max-statements
function findSurrBiggerNum(cord, basin, checked){
    let i = cord[0]
    let j = cord[1]

    if (checked.includes(`${i}${j}`) || data[i][j] === 9){
        return [basin, checked]
    }

    checked.push(`${i}${j}`)

    if (j > 0 && data[i][j-1] - data[i][j] > 0) {
        [basin, checked] = findSurrBiggerNum([i, j-1], basin, checked)
    }

    if (j < width - 1 && data[i][j+1] - data[i][j] >= 0){
        [basin, checked] = findSurrBiggerNum([i, j+1], basin, checked)
    }

    if (i > 0 && data[i-1][j] - data[i][j] >= 0){
        [basin, checked] = findSurrBiggerNum([i-1, j], basin, checked) 
    }

    if (i < height - 1 && data[i+1][j] - data[i][j] >= 0){
        [basin, checked] = findSurrBiggerNum([i+1, j], basin, checked)   
    }

    
    return [[...basin, [i, j]], checked]
}

var basins = []
for (let cord of getLowPoints()){
    let [basin, checked] = findSurrBiggerNum(cord, [], [])
    basins.push(basin)
}

const result2 = basins
    .map((el) => el.length)
    .sort((a, b) => {
        return b - a
    })
    .slice(0, 3)
    .reduce((res, cur) => {
        return res * cur
    }, 1)

console.log(result2)