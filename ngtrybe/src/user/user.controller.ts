import { BadRequestException, Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { catchError, lastValueFrom, map, Observable, of, throwError } from 'rxjs';
import { UserCreateDto } from 'src/dto/user-create.dto';
import { User } from 'src/models/user.interface';
import { UserService } from './user.service';
import { DataSource } from 'typeorm';

@Controller('users')
export class UserController {

    constructor(private userService: UserService,
        private readonly dataSource: DataSource) { }

    @Post()
    async create(@Body(ValidationPipe) data: UserCreateDto): Promise<User | Object> {
        return this.dataSource.transaction(manager => {
            return lastValueFrom(this.userService.withTransaction(manager).create(data));            
        });

    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt }
            }),
            // catchError((err) => throwError(() => err))
        )
    }
}
