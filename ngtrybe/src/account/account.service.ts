import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { AccountEntity } from 'src/entities/account.entity';
import { Account } from 'src/models/Account.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>
    ) { }

    create(account: Account): Observable<Account> {
        return from(this.accountRepository.save(account))
    }
}
