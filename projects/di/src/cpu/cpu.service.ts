import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute(a, b: number) {
    console.log('Supplying 20 watts power to CPU');
    this.powerService.supplyPower(20);
    return a + b;
  }
}
