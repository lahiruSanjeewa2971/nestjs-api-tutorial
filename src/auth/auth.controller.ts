import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   /auth/signup
  @Post('signup')
  signup(@Body() dto: AuthDto) { //dto : data transfer object
    return this.authService.signup(dto);
  }

  //   /auth/signin
  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }
}
