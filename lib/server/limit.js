const fs = require('fs')

exports.isGame = function(sender, isOwner, gcount, _db){
    if (isOwner) {return false;}
    let found = false;
    for (let i of _db){
        if(i.id === sender){
            let limits = i.glimit;
            if (limits >= gcount) {
                found = true;
                return true;
            }else{
                found = true;
                return false;
            }
        }
    }
    if (found === false){
        let obj = {id: sender, glimit:0};
        _db.push(obj);
        fs.writeFileSync('./database/glimit.json',JSON.stringify(_db, null, 2));
        return false;
    }
}
exports.gameAdd = function(sender, _db){
    var found = false;
    Object.keys(_db).forEach((i) => {
        if(_db[i].id == sender){
            found = i
        }
    })
    if (found !== false) {
        _db[found].glimit += 1;
        fs.writeFileSync('./database/glimit.json',JSON.stringify(_db, null, 2));
    }
}
exports.givegame = function(pemain, duit, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === pemain) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].glimit -= duit
        fs.writeFileSync('./database/glimit.json', JSON.stringify(_db, null, 2))
    } else {
        const njti = duit - duit - duit
        const bulimi = ({
            id: pemain,
            glimit: njti
                })
        _db.push(bulimi)
        fs.writeFileSync('./database/glimit.json', JSON.stringify(_db, null, 2))
    }
}
exports.cekGLimit = function(sender, gcount, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if(_db[i].id === sender) {
            position = i
        }
    })
    if (position !== false) {
        return gcount - _db[position].glimit
    } else {
        return gcount
    }
}