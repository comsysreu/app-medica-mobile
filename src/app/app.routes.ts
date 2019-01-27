import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';

let router = true;

export const routes: Routes = [
    {
        path: '',
        redirectTo: router ? '/home' : '/login',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'detailUser/:userId',
                component: DetailUserComponent,
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
];
