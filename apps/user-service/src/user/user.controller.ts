import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';

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
}
