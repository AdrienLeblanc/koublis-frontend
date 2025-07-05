import { Routes } from '@angular/router';
import { LoginComponent } from '@app/auth/login.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export const routes: Routes = [{ path: 'login', component: LoginComponent, data: { title: marker('Login') } }];
