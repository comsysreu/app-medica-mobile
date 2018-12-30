import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';

import { BackendService } from "./shared/backend.service";
let router = false;

export const routes: Routes = [
    {
        path: '',
        redirectTo: router ?  '/home' : '/login',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
];
