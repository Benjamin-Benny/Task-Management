import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './app/auth/login/login.component';
import { RegisterComponent } from './app/auth/register/register.component';
import { AuthGuard } from './app/guards/auth.guard';
import { TaskFormComponent } from './app/task/task-form/task-form.component';
import { TaskListComponent } from './app/task/task-list/task-list.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// const routes: Routes = [
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegisterComponent },
//     { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
//     { path: 'task/new', component: TaskFormComponent, canActivate: [AuthGuard] },
//     { path: 'task/edit/:id', component: TaskFormComponent, canActivate: [AuthGuard] },
//     { path: '**', redirectTo: 'login' }
// ];
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tasks', component: TaskListComponent },
    { path: 'task/new', component: TaskFormComponent },
    { path: 'task/edit/:id', component: TaskFormComponent },
    { path: '**', redirectTo: 'login' }
];

bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(
        withInterceptors([]),
    ),],
});