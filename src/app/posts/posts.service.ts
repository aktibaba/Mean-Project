//create ettigim postu bi componentten digerine tasiya bilmem icin injectable ve rxjs i kullandim
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

  //postunseklini tanimladim
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    //create edilen postu arraye itileye bilmek icin bu spesific returnu kullandim
    return [...this.posts];
  }

  getPostUpdateListener() {
    //rxjs yardimi ile create ettigim postu okudum  ve degistirdim
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    //asagida yeni bi post olusturdum  sonra o degistirdigim arrayi create ettigim posta esitledim
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
