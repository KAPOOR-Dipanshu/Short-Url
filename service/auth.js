const sessionToUserMap = new Map();

function setUser(id, user) {
    // console.log(sessionToUserMap);
    return sessionToUserMap.set(id, user);
}

function getUser(id) {
    // console.log(sessionToUserMap);
    return sessionToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}