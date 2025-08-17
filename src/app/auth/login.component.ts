import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { LoaderComponent, Logger } from '@shared';
import { AuthenticationService } from './authentication.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: `
    .login-card {
      height: 500px;
      width: 800px;
      margin: 50px auto;
      text-align: center;
    }
  `,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    TranslateModule,
    MatButtonModule,
    MatDivider,
    NgOptimizedImage,
    LoaderComponent,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  version = signal<string | undefined>(environment.version);
  error = signal<string | undefined>(undefined);
  isLoading = signal(false);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    this.isLoading.set(true);
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading.set(false);
        }),
        takeUntilDestroyed(),
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
