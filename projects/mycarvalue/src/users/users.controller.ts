import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from '../guards/auth.guards';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // async whoAmI(@Session() session: any) {
  //   const user = await this.userService.findOne(session.UserId);
  //   if (!user) {
  //     throw new NotFoundException(
  //       'User data not found or not signed in properly',
  //     );
  //   }
  //   return user;
  // }
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUserDecorator() user: string) {
    return user;
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.UserId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.UserId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.UserId = null;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    this.userService.update(parseInt(id), body);
  }
}
