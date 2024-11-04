import { IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @MinLength(6, { message: 'Password too short' })
  password: string
}
