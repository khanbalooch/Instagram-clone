import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPagePageRoutingModule } from './comment-page-routing.module';

import { CommentPagePage } from './comment-page.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CommentPagePageRoutingModule
  ],
  declarations: [CommentPagePage]
})
export class CommentPagePageModule {}
