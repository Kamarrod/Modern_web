import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FakeBackendProvider } from './shared/fake-backend';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SecondComponent } from './components/second/second.component';
//import { DemoMaterialModule } from './demo-material/demo-material.module';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { HomeModalComponent } from './components/home-modal/home-modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './components/register/register.component';
// import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

// @NgModule({
//   declarations: [AppComponent, LoginComponent, SecondComponent, AdminComponent, HomeComponent, HomeModalComponent],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatCardModule,
//     DemoMaterialModule,
//   ],
//   providers: [FakeBackendProvider],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecondComponent,
    AdminComponent,
    HomeComponent,
    HomeModalComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonToggleModule,
    // DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FakeBackendProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
