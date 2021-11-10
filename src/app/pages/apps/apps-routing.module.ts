import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { PatientsComponent } from './patients/patients.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { DentistsComponent } from './dentists/dentists.component';
import { ProductsComponent } from './products/products.component';
import { DentistviewComponent } from './dentistview/dentistview.component';
import { SettingsappComponent } from './settingsapp/settingsapp.component';
import { NewproductComponent } from './newproduct/newproduct.component';

const routes: Routes = [
    {
        path: 'apps-calendar',
        component: CalendarComponent
    },
    {
        path: 'newproduct',
        component: NewproductComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    }, 
    {
        path: 'dentists',
        component: DentistsComponent
    }, 
    {
        path: 'settingsapp',
        component: SettingsappComponent
    },  
    {
        path: 'dentistview/:id',
        component: DentistviewComponent
    },
    {
        path: 'suscriptores',
        component: PatientsComponent
    }, 
    {
        path: 'orderdetail/:id',
        component: OrderdetailComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppsRoutingModule { }
