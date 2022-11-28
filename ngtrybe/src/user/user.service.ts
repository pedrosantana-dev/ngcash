import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { AccountService } from 'src/account/account.service';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { Account } from 'src/models/Account.interface';
import { User } from 'src/models/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends TransactionFor<UserService> {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService,
        private accountService: AccountService,
        moduleRef: ModuleRef
    ) {
        super(moduleRef)
    }

    create(user: User): Observable<User | Object> {
        return this.accountService.create({ balance: 100 }).pipe(
            switchMap((account: Account) => {
                return this.authService.hashPassword(user.password).pipe(
                    switchMap((passwordHash: string) => {
                        const newUser = new UserEntity();
                        newUser.username = user.username;
                        newUser.password = passwordHash;
                        newUser.accountId = account.id;

                        return from(this.userRepository.save(newUser)).pipe(
                            map((user: User) => {
                                const { password, ...result } = user;
                                return result;
                            })
                        )
                    }),
                    catchError((err) => throwError(() => new BadRequestException(err.message)))
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
