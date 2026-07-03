import { incidencias } from './models/incidencias';
import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { IncidenciaInsert } from './components/incidenciacomponent/incidencia-insert/incidencia-insert';
import { IncidenciaList } from './components/incidenciacomponent/incidencia-list/incidencia-list';
import { IncidenciaUpdate } from './components/incidenciacomponent/incidencia-update/incidencia-update';
import { Incidenciacomponent } from './components/incidenciacomponent/incidenciacomponent';
import { Categoriacomponent } from './components/categoriacomponent/categoriacomponent';
import { CategoriaList } from './components/categoriacomponent/categoria-list/categoria-list';
import { CategoriaInsert } from './components/categoriacomponent/categoria-insert/categoria-insert';
import { CategoriaUpdate } from './components/categoriacomponent/categoria-update/categoria-update';
import { Distritocomponent} from './components/distritocomponent/distritocomponent';
import { DistritoList } from './components/distritocomponent/distrito-list/distrito-list';
import { DistritoInsert } from './components/distritocomponent/distrito-insert/distrito-insert';
import { DistritoUpdate } from './components/distritocomponent/distrito-update/distrito-update';
import { ReporteIncidencias } from './components/reporte-incidencias/reporte-incidencias';
import { IncidenciaSearch } from './components/incidenciacomponent/incidencia-search/incidencia-search';
import { CategoriaSearch } from './components/categoriacomponent/categoria-search/categoria-search';
import { DistritoSearch } from './components/distritocomponent/distrito-search/distrito-search';
import { ReporteDistritos } from './components/reporte-distritos/reporte-distritos';
import { Authenticate } from './components/authenticate/authenticate';
import { seguridadGuard } from './guards/seguridad.guard';
import { MisIncidencias } from './components/incidenciacomponent/mis-incidencias/mis-incidencias';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Authenticate,
    },
    {
        path: 'homes',
        component: Homecomponent,
        
    },
  {
    path: 'incidencias',
    component: Incidenciacomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'nuevo', component: IncidenciaInsert },
      { path: 'lista', component: IncidenciaList },
      { path: 'edits/:id', component: IncidenciaUpdate },
      { path: 'searchs', component: IncidenciaSearch },
      { path: 'mis-incidencias', component: MisIncidencias },
    ],
  },
  {
    path: 'categorias',
    component:  Categoriacomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'nuevo', component: CategoriaInsert },
      { path: 'lista', component: CategoriaList },
      { path: 'edits/:id', component: CategoriaUpdate },
      { path: 'searchs', component: CategoriaSearch },
    ],
  },
  {
    path: 'distritos',
    component: Distritocomponent,
    canActivate: [seguridadGuard],
    canActivateChild: [seguridadGuard],
    children: [
      { path: 'nuevo', component: DistritoInsert },
      { path: 'lista', component: DistritoList },
      { path: 'edits/:id', component: DistritoUpdate },
      { path: 'searchs', component: DistritoSearch },
    ],
  },
  {
    path: 'reporte-incidencias',
    component: ReporteIncidencias,
  },
  {
  path: 'reporte-distritos',
  component: ReporteDistritos,
},
];
