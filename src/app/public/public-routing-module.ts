import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { Home } from './components/home/home';
import { Properties } from './components/properties/properties';
import { PropertyDetails } from './components/properties/property-details/property-details';
import { NotFound404 } from './components/not-found-404/not-found-404';
import { authGuard } from '../core/guards/auth-guard-guard';
import { Favorite } from './components/favorite/favorite';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'home', component: Home },
      { path: 'properties', component: Properties, canActivate: [authGuard] },
      { path: 'properties/:propertyId', component: PropertyDetails },
      { path: 'favorite', component: Favorite },
      { path: 'not-found', component: NotFound404 },
      { path: '**', component: NotFound404 }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
