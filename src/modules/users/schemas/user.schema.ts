import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop()
    image: string;

    @Prop()
    age: Number;
}

export const UserSchema = SchemaFactory.createForClass(User);
