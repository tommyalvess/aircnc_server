import { Document, Model, Schema, Types, model } from 'mongoose';

interface ISpot {
    thumbnail: string;
    company: string;
    price: number;
    techs: string[];
    user: Types.ObjectId;
}
  
interface ISpotDocument extends ISpot, Document {
    // Adicione aqui propriedades ou métodos específicos do documento, se necessário.
}
  
interface ISpotModel extends Model<ISpotDocument> {
    // Adicione aqui métodos estáticos do modelo, se necessário.
}

const spotSchema = new Schema<ISpotDocument, ISpotModel>(
    {
        thumbnail: String,
        company: String,
        price: Number,
        techs: [String],//aqui vai ser um vetor com varias string dentro
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    }, 
    {
        toJSON: 
        {
            virtuals: true,
        },
    }
);

spotSchema.virtual('thumbnail_url').get(function (this: ISpotDocument) {
    return `http://localhost:3333/files/${this.thumbnail}`;
});
  
const SpotModel: ISpotModel = model<ISpotDocument, ISpotModel>('Spot', spotSchema);

export default SpotModel;