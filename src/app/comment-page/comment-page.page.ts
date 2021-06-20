import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.page.html',
  styleUrls: ['./comment-page.page.scss'],
})
export class CommentPagePage implements OnInit {

  profile = null;
  comments = null;
  commentValue = '';
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    try {
      this.profile = JSON.parse(this.router.snapshot.paramMap.get('profile'));
      this.comments = [
        {name:'Muhammad Ibrahim', comment:'To learn is my passion'},
        {name:'ales john', comment:'lorem ipsum'},
      ];
    } catch (error) {
      console.log(error.stack);
    }
  }
  addComment(){
    this.comments.push( {name: 'You', comment: this.commentValue});
    this.commentValue = '';
  }

}
