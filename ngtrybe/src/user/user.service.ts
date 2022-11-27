import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/models/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ) { }

    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.username = user.username;
                newUser.password = passwordHash;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const { password, ...result } = user;
                        return result;
                    })
                )
            })
        )
    }

    login(user: User): Observable<string> {
        return this.validateUser(user.username, user.password).pipe(
            switchMap((user: User) => this.authService.generateJWT(user))
        )
    }

    validateUser(username: string, password: string): Observable<User> {
        return from(this.userRepository.findOne({
            where: {
                username: username
            },
            select: ['id', 'username', 'password']
        })).pipe(
            switchMap((user: User) => {
                if (!user) throw new UnauthorizedException('Credenciais inválidas');
                return this.authService.comparePasswords(password, user.password).pipe(
                    map((match: boolean) => {
                        if (match) {
                            const { password, ...result } = user;
                            return result;
                        } else {
                            throw new UnauthorizedException('Credenciais inválidas')
                        }
                    })
                )
            })
        )
    }
}
