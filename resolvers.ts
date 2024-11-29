import { Collection, ObjectId } from "mongodb";
import { VueloModel, Vuelo } from "./types.ts";
import { fromModeltoVuelo } from "./utils.ts";

export const resolvers = {
    Query: {
        getFlights: async (_:unknown,
             args: {origen: string; destino: string},
            context: {VuelosCollection: Collection<VueloModel>}
        ): Promise<Vuelo[]> => {
            if(args.origen && args.destino){
                const VuelosDB = await context.VuelosCollection.find({origen: args.origen, destino: args.destino}).toArray();
                return VuelosDB.map((vueloModel) =>
                    fromModeltoVuelo(vueloModel)
                  );
            }else if(args.origen){
                const VuelosDB = await context.VuelosCollection.find({origen: args.origen}).toArray();
                return VuelosDB.map((vueloModel) =>
                    fromModeltoVuelo(vueloModel)
                  );
            }else if(args.destino){
                const VuelosDB = await context.VuelosCollection.find({destino: args.destino}).toArray();
                return VuelosDB.map((vueloModel) =>
                    fromModeltoVuelo(vueloModel)
                  );
            }else{
                const VuelosDB = await context.VuelosCollection.find().toArray();
                return VuelosDB.map((vueloModel) =>
                    fromModeltoVuelo(vueloModel)
                  );
            }
        },

        getFlight: async( _: unknown,
            { id }: { id: string },
      context: {
        VuelosCollection: Collection<VueloModel>;
      },
    ): Promise<Vuelo | null> => {
      const vueloDB = await context.VuelosCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!vueloDB) {
        return null;
      }
      return fromModeltoVuelo(vueloDB);
    },
    },

    Mutation: {
        addFlight: async (
            _: unknown,
            args: { origen: string; destino: string; fechaHora: string },
            context: {
              VuelosCollection: Collection<VueloModel>;
            },
          ): Promise<Vuelo> => {
            const { origen, destino, fechaHora } = args;
            const { insertedId } = await context.VuelosCollection.insertOne({
              origen,
              destino,
              fechaHora
            });
            const vueloModel = {
                _id: insertedId,
                origen,
                destino,
                fechaHora,
              };
              return fromModeltoVuelo(vueloModel!);
            },
        
    }
}