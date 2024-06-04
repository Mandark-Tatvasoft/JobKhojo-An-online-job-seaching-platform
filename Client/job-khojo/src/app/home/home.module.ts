import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeRoutingModule, ToastrModule.forRoot()],
})
export class HomeModule {}
