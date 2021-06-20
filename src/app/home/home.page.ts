import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  postsList = [];
  page = 1;
  constructor(private http: HttpClient, private actionSheetController: ActionSheetController) {
    this.loadData(null);
  }

  ngOnInit() {
  }

  async loadData(event){
    try {
      const data: any = await this.http.get(environment.randomUserApi + '?results=10').toPromise();
      const images: any = await this.http.get('https://picsum.photos/v2/list?page='+ this.page +'&limit=10').toPromise();
      [].map((item,index) => item );
      data.results = data.results.map( (item, index ) => Object.assign(item,{post:images[index]}));
      this.postsList.push(...data.results);
      this.page++;
      if (event) { event.target.complete(); }
    } catch (error) {
      console.log(error.stack);
      console.log('Unable to load data');
    }
  }

  async openShareActionSheet() {
    const buttons = this.postsList.map((item) => {
      const x = {
      text: item.name.first + item.name.last,
      role: 'destructive',
      icon: 'person',
      handler: () => console.log('Share clicked')};
        return x;
    });
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'actionSheet',
      buttons
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
