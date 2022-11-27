import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(password: string, passwordHash: string): Observable<boolean> {
        return of<boolean>(bcrypt.compareSync(password, passwordHash));
    }

    generateJWT(payload: Object): Observable<string> {
        return from(this.jwtService.signAsync({ user: payload }))
    }
}
