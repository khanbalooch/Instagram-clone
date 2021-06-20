import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() postData: any = {};
  @Input() fullScreenMode = false;
  @Output() share = new EventEmitter<string>();
  isLiked = false;
  isBookmarked = false;
  constructor(private router: Router, public actionSheetController: ActionSheetController) {
  }

  ngOnInit() {
    console.log(this.postData);
  }

  gotoProfile(){
    this.router.navigate(['profile', {profile: JSON.stringify(this.postData)}]);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'actionSheet',
      buttons: [{
        text: 'Report...',
        role: 'destructive',
        handler: () => {
          console.log('Report clicked');
        }
      }, {
        text: 'About This Account',
        handler: () => {
          this.gotoProfile();
        }
      }, {
        text: 'Share to...',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Unfollow',
        handler: () => {
          console.log('Unfollow clicked');
        }
      }, {
        text: 'Mute',
        handler: () => {
          console.log('Mute clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  openShareActionSheet() {
    this.share.emit('eventShare');
  }

  gotoCommentPage(){
    this.router.navigate(['comment', {profile: JSON.stringify(this.postData)}]);
  }
}
