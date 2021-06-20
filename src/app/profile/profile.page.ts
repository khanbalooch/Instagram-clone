import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile = null;
  images = null;
  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    try {
      this.profile = JSON.parse(this.router.snapshot.paramMap.get('profile'));
      
      if(this.profile === null){
        console.log('getting data');
        const data: any = await this.http.get(environment.randomUserApi + '?results=1').toPromise();
        this.profile = data.results[0];
        this.profile.post = (await this.http.get('https://picsum.photos/v2/list?page=1&limit=1').toPromise())[0];
        console.log(this.profile);
      }
      this.images = await this.http.get('https://picsum.photos/v2/list?page=1&limit=10').toPromise();
    } catch (error) {
      console.log(error.stack);
    }
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      // mode: 'ios',
      cssClass: 'actionSheet',
      buttons: [{
        text: 'Report...',
        role: 'destructive',
        handler: () => {
          console.log('Report clicked');
        }
      }, {
        text: 'Block',
        role: 'destructive',
        handler: () => {
          console.log('Block clicked');
        }
      },{
        text: 'About This Account',
        handler: () => {
        }
      }, {
        text: 'Restrict',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Hide Your Story',
        handler: () => {
          console.log('Unfollow clicked');
        }
      }, {
        text: 'Copy Profile Url',
        handler: () => {
          console.log('Mute clicked');
        }
      }, {
        text: 'Share this Profile',
        handler: () => {
          console.log('Mute clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



}
