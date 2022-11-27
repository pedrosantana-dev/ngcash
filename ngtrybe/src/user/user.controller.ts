import { BadRequestException, Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { UserCreateDto } from 'src/dto/user-create.dto';
import { User } from 'src/models/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    create(@Body(ValidationPipe) data: UserCreateDto): Observable<User | Object> {
        return this.userService.create(data).pipe(
            catchError((err) => throwError(() => new BadRequestException(err.message)))
        );
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
