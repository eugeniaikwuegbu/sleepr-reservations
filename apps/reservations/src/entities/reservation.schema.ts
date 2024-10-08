import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReservationsDocument = Reservation & Document;

@Schema({ versionKey: false, timestamps: true })
export class Reservation extends AbstractDocument {
  @Prop()
  timeStamp: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
