import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
<<<<<<< HEAD
import { pipe, Subject } from "rxjs";
=======
import { Subject } from "rxjs";
>>>>>>> 44fb45c6f5872bbf26db093999206280d4ba4800
import{map}from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })// roota inject et

export class PostsService {

  private posts: Post[] = []; //bi post create ettik

  private postsUpdated = new Subject<Post[]>();//bide yeni post olusturursak onuda postun turunden yeniden olustur dedik

  constructor(private http: HttpClient) {} //http requesti icin http yuo create ettin

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
<<<<<<< HEAD
      .pipe(map( (postData)=>{
        return postData.posts.map(post=>{
       return {
          title:post.title,
          content:post.content,
          id:post._id
           };
        });
      }))
      .subscribe(transformendPosts => {
        this.posts =transformendPosts;
=======
      .pipe(map((postData)=>{
        return postData.posts.map(post=>{
          return{
            title:post.title,
            content:post.content,
            id:post._id
          };
        });
      }))
      .subscribe(Transformendposts=> {
        this.posts =Transformendposts;
>>>>>>> 44fb45c6f5872bbf26db093999206280d4ba4800
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string,postId:string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
     const id =responseData.postId;
     post.id=id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
<<<<<<< HEAD
    }

 deletePost(postId:string){

   this.http.delete("http://localhost:3000/api/posts/"+ postId)
 .subscribe(()=>{
   const updatedPosts= this.posts.filter(post=>post.id!==postId);
   this.posts= updatedPosts;
this.postsUpdated.next([...this.posts]);
 });
      }

    }
=======
  }
  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts"+postId)
    .subscribe(()=>{
      console.log("deleted");
    }
    );
  }
}
>>>>>>> 44fb45c6f5872bbf26db093999206280d4ba4800
