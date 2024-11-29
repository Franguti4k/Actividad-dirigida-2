import { VueloModel, Vuelo } from "./types.ts";

export const fromModeltoVuelo  = (vueloModel: VueloModel): Vuelo => {
    return {
        id: vueloModel._id!.toString(),
        origen: vueloModel.origen,
        destino: vueloModel.destino,
        fechaHora: vueloModel.fechaHora
    }
}