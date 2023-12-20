import { Document, Model, Schema, model } from 'mongoose';

interface IUser {
  email: string;
}

interface IUserDocument extends IUser, Document {
  // Adicione aqui propriedades ou métodos específicos do documento, se necessário.
}

interface IUserModel extends Model<IUserDocument> {
  // Adicione aqui métodos estáticos do modelo, se necessário.
}

const userSchema = new Schema<IUserDocument, IUserModel>({
  email: String,
});

const UserModel: IUserModel = model<IUserDocument, IUserModel>('User', userSchema);

export default UserModel;
