import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./public/public-module').then((m) => m.PublicModule),
    },
];
