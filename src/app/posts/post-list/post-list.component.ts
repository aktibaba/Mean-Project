import {Component} from '@angular/core'

@Component({
selector:'app-post-list',
templateUrl:'./post-list.component.html',
styleUrls:['./post-list.component.css']
})
export class PostListComponent{
// posts=[
//   {title:'First Post', content:'this is the first post content'},
//   {title:'Third Post', content:'this is the first post content'},
//   {title:'Second Post', content:'this is the first post content'}

// ]
posts=[];
}
