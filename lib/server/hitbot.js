const fs = require('fs')

exports.addCmd = function(command, duit, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === command) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].total += duit
        fs.writeFileSync('./database/dashboard/datacmd.json', JSON.stringify(_db))
    } else {
        const bulin = ({
            id: command,
            total: duit
                })
        _db.push(bulin)
        fs.writeFileSync('./database/dashboard/datacmd.json', JSON.stringify(_db))
    }
}

exports.AddHituser = function(sender, _db){
    var found = false;
    Object.keys(_db).forEach((i) => {
        if(_db[i].id == sender){
            found = i
        }
    })
    if (found !== false) {
        _db[found].hit += 1;
        fs.writeFileSync('./database/dashboard/userhit.json',JSON.stringify(_db));
    }
}
