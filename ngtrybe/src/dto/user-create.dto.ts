import { IsNotEmpty, MinLength, Contains, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from "class-validator";


@ValidatorConstraint({ name: 'passwordValitador', async: false })
class PasswordValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const regex = /^(?=.*\d)(?=.*[A-Z])/;
    return regex.test(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'A senha ($value) deve ter pelo um número e uma letra maiúscula!';
  }
}


export class UserCreateDto {
  @MinLength(3, { message: 'Nome de usuário deve ter pelo menos 3 caracteres!' })
  @IsNotEmpty({ message: 'Nome de usuário não deve estar vazio!' })
  username: string;

  @Validate(PasswordValidator)
  @MinLength(8, { message: 'A senha deve ser maior ou igual a 8 caractes!' })
  @IsNotEmpty({ message: 'A senha não deve estar vazio!'})
  password?: string;
}