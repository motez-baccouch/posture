import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  PaymentInfo : CreatePaymentDto;
  create(createPaymentDto: CreatePaymentDto) {
    this.PaymentInfo.Address = createPaymentDto.Address;
    this.PaymentInfo.NumeroTelephone = createPaymentDto.NumeroTelephone;
    this.PaymentInfo.email = createPaymentDto.email;
    this.PaymentInfo.type = createPaymentDto.type;
    return 'This action adds a new payment';
  }
}
