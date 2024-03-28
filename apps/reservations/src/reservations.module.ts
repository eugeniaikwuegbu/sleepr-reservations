import { DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { Reservation, ReservationSchema } from './entities/reservation.schema';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
