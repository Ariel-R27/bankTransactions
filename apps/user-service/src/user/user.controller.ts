import { Body, Controller, Post } from '@nestjs/common';
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
}
