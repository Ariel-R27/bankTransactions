import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createUser(data: {
        email: string;
        identityCard: string;
        fullName: string;
        phone: string;
    }): Promise<User>{
        const user = this.userRepository.create({
            email: data.email,
            identityCard: data.identityCard,
            fullName: data.fullName,
            phone: data.phone
        });
        return await this.userRepository.save(user);
    };

    async findOne(userId: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id: userId} });
    }
}
