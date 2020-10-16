import { Component,EventEmitter,Output } from '@angular/core';
import{Post} from "../post.model";

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent{
  //postun templateini uste design ettim
enterendContent="";
enteredTitle="";
 @Output() postCreated= new EventEmitter<Post>();
  onAddpost(){
    //postu objesini olusturdum
const post: Post ={
  title:this.enteredTitle,
  content:this.enterendContent
}
//event emitteri kullanarak bu postu display etmesini istedim
this.postCreated.emit(post);
}
}
