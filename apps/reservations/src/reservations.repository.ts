import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './entities/reservation.schema';

@Injectable()
export class ReservationRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationRepository.name);
  constructor(
    @InjectModel(Reservation.name)
    reservationsModel: Model<Reservation>,
  ) {
    super(reservationsModel);
  }
}
