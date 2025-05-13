import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from './services/login-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';

  user: any = null;

constructor(private loginService: LoginServiceService, private router: Router) {}

ngOnInit(): void {
  this.user = this.loginService.getCurrentUser();
}

logout() {
  this.loginService.logout();
  this.router.navigate(['/']);
}

}
