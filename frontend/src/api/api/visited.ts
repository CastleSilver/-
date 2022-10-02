import { setRequest, myAxios } from "../settings"

const VISITED = "/like"

const visited = {
  do: async (restoId: number) => {
    const reqData = {
      uri: VISITED,
      method: "POST",
    }
    const req = setRequest(reqData)
    const res = await myAxios(req)
  },

  undo: async (restoId: number) => {
    const reqData = {
      uri: VISITED,
      method: "DELETE",
    }
    const req = setRequest(reqData)
    const res = await myAxios(req)
  },
}

export default visited
