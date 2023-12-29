import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'games',
    title: 'Games',
    loadComponent: () => import('./pages/games/game-list/game-list.component')
  },
  {
    path: 'info/:id',
    title: 'Game Info',
    loadComponent: () => import('./pages/games/game-detail/game-detail.component'),
  },
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/games' }
];
