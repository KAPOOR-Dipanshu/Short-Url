const sessionToUserMap = new Map();

function setUser(id, user) {
    sessionToUserMap.set(id, user);
}

function getUser(id) {
    sessionToUserMap.get(user);
}

module.exports = {
    setUser,
    getUser,
}