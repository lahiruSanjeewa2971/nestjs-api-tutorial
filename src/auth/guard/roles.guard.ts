import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} //reflector is injected here so we can read metadata from route decorators.

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]); //reads the roles defined using @Roles('admin').

    if (!requiredRoles) return true; //If no roles are defined on the route, allow access.

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.includes(user.role);
  }
}
