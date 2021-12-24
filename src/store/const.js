const modules = {
  AUTH: "auth",
  TODO: "todo",
}

const getterTypes = {
  AUTH_ISLOGGEDIN: "isLoggedIn", 
}

const mutationTypes = {
  AUTH_SETUSER: "setUser",
  AUTH_CLEARUSER: "clearUser",

  TODO_LIST: "list",
  TODO_CREATE: "create",
  TODO_UPDATE: "update",
  TODO_DELETE: "delete",
}

const actionTypes = {
  AUTH_LOGIN: "login",
  AUTH_LOGOUT: "logout",
  
  TODO_LIST: "list",
  TODO_CREATE: "create",
  TODO_UPDATE: "update",
  TODO_DELETE: "delete",
}

export { modules, getterTypes, mutationTypes, actionTypes }