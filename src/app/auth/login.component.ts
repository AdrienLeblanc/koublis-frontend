import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { LoaderComponent, Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from './authentication.service';
import { EMPTY } from 'rxjs'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '@app/i18n';
import { MatButtonModule } from '@angular/material/button';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: `
    .login-error {
      color: var(--mat-sys-error);
    }
  `,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    LoaderComponent,
    TranslateModule,
    LanguageSelectorComponent,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  version: string | undefined = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        catchError((error: string) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe((credentials) => {
        log.debug(`${credentials.username} successfully logged in`);
        this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
