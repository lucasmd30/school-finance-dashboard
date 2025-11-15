import { Controller, Get } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';

@Controller('indicators')
export class IndicatorsController {
  constructor(private indicatorsService: IndicatorsService) {}

  @Get()
  getIndicators() {
    return this.indicatorsService.getIndicators();
  }
}
