const sessionToUserMap = new Map();

function setUser(id, user) {
    sessionToUserMap.set(id, user);
}

function getUser(id) {
    sessionToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}