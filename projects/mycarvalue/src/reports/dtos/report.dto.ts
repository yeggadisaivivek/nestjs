import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  mileage: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  long: number;
  @Expose()
  lat: number;
  @Expose()
  price: number;
  @Expose()
  year: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;
}
