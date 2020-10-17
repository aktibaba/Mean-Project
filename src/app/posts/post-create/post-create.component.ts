import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
//postu create etmek icin bir file actim orada iki variable tanimladim title ve content olarak

export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  //post la alakali seyleri post service clasinda hendle ettim sadece burda bi object olusturarak buraya ekledim
  constructor(public postsService: PostsService) {}


  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
