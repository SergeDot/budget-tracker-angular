import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { inject } from "@angular/core"


export const authGuard = (): CanActivateFn => {
  return () => {
    const authService: AuthService = inject(AuthService)
    const router: Router = inject(Router)

    if (authService.isAuthSig()) {
      return true
    }

    router.navigate(['/login'])
    return false
  }
}