import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentPagePage } from './comment-page.page';

const routes: Routes = [
  {
    path: '',
    component: CommentPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentPagePageRoutingModule {}
