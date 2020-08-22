import Constants from "./constants";

function getHost() {
  let host = Constants.serverHostKey;
  return process.env[host];
}

function getWSHost() {
  let host = Constants.wsHost;
  return process.env[host];
}

const ServerUrls = {
  checkIfRoomExists: function (roomId) {
    return getHost() + "/api/v1/active/room/" + roomId;
  },
  createRoom: function (uid) {
    return getHost() + "/api/v1/room/" + uid;
  },
  getChatHistory: function (uid) {
    return getHost() + "/api/v1/chats/" + uid;
  },
  getWSconnection: function (uid, name) {
    return getWSHost() + "/" + uid + "?" + name;
  },
  toggleRoomVisibility: function (uid) {
    return getHost() +  "/api/v1/room/" + uid + "/visibility/toggle";
  },
};

export default ServerUrls;
