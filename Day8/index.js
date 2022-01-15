import * as fs from 'fs';

const raw = fs.readFileSync("./q8.txt", "utf8").toString().split("\r\n")
const part1 = raw.map((el) => {
    return el.split("|")[1]
})
.reduce((res, curr) => {
    const els = curr.split(" ")
    els.shift()
    return [...res, ...els]
}, []).reduce((res, curr) => {
    return [2, 4, 3, 7].includes(curr.length) ? res + 1 : res
}, 0)
console.log(part1)

const part2 = raw.map((li) => {
    const [line1, line2] = li.split("|")
    const input = line1.split(" ")
    const mappings = input.reduce((res, curr) => {
        if ([2, 4].includes(curr.length)){
            return {
                ...res,
                [curr.length]:[...new Set(curr)]
            }
        }
        return res
    }, {})

    const num = line2.split(" ").reduce((res, curr) => {
        const size = curr.length
        if (size === 2){
            return res + "1"
        } else if (size === 4){
            return res + "4"
        } else if (size === 3){
            return res + "7"
        } else if (size === 7){
            return res + "8"
        } else if (size === 5){
            let elments = [...new Set(curr.split(""))]
            let intersectionWithTwo = elments.filter((e) => mappings["2"].includes(e))
            let intersectionWithFour = elments.filter((e) => mappings["4"].includes(e))
            if (intersectionWithTwo.length === 2){
                return res + "3"
            }
            else if (intersectionWithFour.length === 2) {
                return res + "2"
            }
            else {
                return res + "5"
            }
        } else if (size === 6) {
            let elments = [...new Set(curr.split(""))]
            let intersectionWithTwo = elments.filter((e) => mappings["2"].includes(e))
            let intersectionWithFour = elments.filter((e) => mappings["4"].includes(e))
            if (intersectionWithTwo.length === 1){
                return res + "6"
            }
            else if (intersectionWithFour.length === 4){
                return res + "9"
            }
            else {
                return res + "0"
            }
        }
        return res   
    }, "")
    return num
})
.reduce((res, el) => {
    return res + (+el)
}, 0)

console.log(part2)
