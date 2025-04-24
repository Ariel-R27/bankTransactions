import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('createUser')
    createUser(@Body() dto: CreateUserDto): Promise<User>{
        return this.userService.createUser(dto);
    };

    @Get(':userId/validate')
    async validateUserAccount(@Param('userId') userId: string){
        const user = await this.userService.findOne(userId)
        if(!user) {
            throw new HttpException('Invalid user account', HttpStatus.BAD_REQUEST);
        }
        return { status: 'valid' };
    };

    //Event to heard account validation by Kafka
    @EventPattern('user.validate')
    async validateAccountFromKafka(@Payload() message: any){
        //We retrieve the accountID of the message
        console.log('Mensaje recibido de Kafka User: ', message);

        const { userId } = message;
        
        console.log(`Validando cuenta con ID: ${userId}`);
        const user = await this.userService.findOne(userId);

        //Here you validate whether the account is blocked or active
        if(!user) {
            console.log('Usuario invalido');
            return { status: 'invalid'}
        }

        console.log('Usuario valido');
            return { status: 'valid'}
    }
}
