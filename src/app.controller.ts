import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CreateDeviceDto } from './createdevice.dto.js';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('newdevice')
  @Render('newdeviceform')
  getNewDeviceForm(){}

  @Post('newdevice')
  @Render('newdeviceform')
  postNewDevice(@Body() body: CreateDeviceDto) {
    const errors: string[] = [];

    if (!body.price){
      errors.push('Price is required');
    } else {
      const priceNum = Number(body.price);
      if (isNaN(priceNum)) {
        errors.push('Price must be a valid number')
      } else if (priceNum <= 0) {
        errors.push('Price must be positive');
      }
    }

    if (!body.type) {
      errors.push('type is required');
    } else if (body.type !== 'router' && body.type !== 'switch' && body.type !== 'firewall'){
      errors.push('Type must be one of the required values')
    }

    if (!body.serial){
      errors.push('Serial is requried')
    }else if (!/^[A-Z]{4}-[0-9]{4}$/.test(body.serial)){
      errors.push('Serial must be in the format ABCD-1234')
    }

    if (errors.length > 0) {
      return {
        errors,
        body
      }
    }else {
      // Eltárolás adatbázisban
      return {
        success: true
      }
    }

    
  }
}
