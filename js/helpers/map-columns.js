// map column letters to their number representations
let columns = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8};

function mapColumn(column){
    if(typeof column === "string"){
        return columns[column];
    }
    return Object.keys(columns).find(key => columns[key] === column);
}