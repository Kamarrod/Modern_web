import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FakeBackendProvider } from './shared/fake-backend';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SecondComponent } from './components/second/second.component';
import { DemoMaterialModule } from './demo-material/demo-material.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SecondComponent, AdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    DemoMaterialModule,
  ],
  providers: [FakeBackendProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
