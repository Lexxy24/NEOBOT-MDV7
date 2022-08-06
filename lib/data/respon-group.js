const fs = require('fs');

const addResponGroup = (groupId, key, response, _dir) => {
    var object_add = {
        id: groupId,
        key: key,
        response: response
    }
    _dir.push(object_add)
    fs.writeFileSync('./database/respon-group.json', JSON.stringify(_dir, null, 3))
}

const sendResponGroup = (groupId, key, _dir) => {
    let position = null
    Object.keys(_dir).forEach((x) => {
        if (_dir[x].id === groupId && _dir[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _dir[position].response
    }
}

const checkResponGroup = (groupId, key, _dir) => {
    let status = false
    Object.keys(_dir).forEach((x) => {
        if (_dir[x].id === groupId && _dir[x].key === key) {
            status = true
        }
    })
    return status
}

const changeResponGroup = (groupId, key, response, _dir) => {
    Object.keys(_dir).forEach((x) => {
        if (_dir[x].id === groupId && _dir[x].key === key) {
            _dir[x].response = response
            fs.writeFileSync('./database/respon-group.json', JSON.stringify(_dir, null, 3))
        }
    })
    return true
}

const deleteResponGroup = (groupId, key, _dir) => {
    Object.keys(_dir).forEach((x) => {
        if (_dir[x].id === groupId && _dir[x].key === key) {
            _dir.splice(x, 1)
            fs.writeFileSync('./database/respon-group.json', JSON.stringify(_dir, null, 3))
        }
    })
    return true
}

const getResponGroup = (groupID, _db) => {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position].text
    }
}


module.exports = {
    addResponGroup,
    checkResponGroup,
    changeResponGroup,
    deleteResponGroup,
    sendResponGroup,
    getResponGroup
}