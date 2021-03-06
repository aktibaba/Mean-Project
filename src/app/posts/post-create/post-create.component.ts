      import { Component, OnInit } from "@angular/core";
      import { FormControl, FormGroup,Validators} from "@angular/forms";
      import { ActivatedRoute, ParamMap } from '@angular/router';
      import { Post } from '../post.model';
      import { PostsService } from "../posts.service";
      import {mimeType} from "./mime-type.validator";


      @Component({
        selector: "app-post-create",
        templateUrl: "./post-create.component.html",
        styleUrls: ["./post-create.component.css"]
      })
      //postu create etmek icin bir file actim orada iki variable tanimladim title ve content olarak

      export class PostCreateComponent implements OnInit{

        //postun title ve contenti icin empty variable actik
        enteredTitle = "";
        enteredContent = "";
        //postun bi edit bi create modu oldugu icin modunu create sabitledim ilk olarak
        mode ="create";
        postId:string;
        post:Post;
        //loading spinner icin bunu ekledik
        isLoading=false;
        //her postu bir form grup tan yaptik ki istedigimizi rahatca yapalim
        form:FormGroup;
        imagePreview:string;
        //post la alakali seyleri post service clasinda hendle ettim sadece burda bi object olusturarak buraya ekledim
        constructor(public postsService: PostsService, public route:ActivatedRoute) {}

        ngOnInit(){

         //yukarida create ettigimiz form grubu burada actik ve validator ekledik
          this.form = new FormGroup({

            title: new FormControl(null,{ validators: [Validators.required,Validators.minLength(3)]}),
            content: new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]}),
            image:new FormControl(null,{validators:[Validators.required]})

            });


//eger create ettigimiz postu edit etmek istiyorsak id si belilenmis postu al ve edit et

          this.route.paramMap.subscribe((paramMap: ParamMap)=>{

            if (paramMap.has('postId')){
              this.mode="edit";
              this.postId=paramMap.get('postId');
              this.isLoading=true;
              this.postsService.getPost(this.postId).subscribe(postData=>{
                this.isLoading=false;
                this.post={

                  id:postData._id,
                  title:postData.title,
                   content:postData.content};

                    this.form.setValue({'title':this.post.title,'content':this.post.content});
                  });
          }

      else{
        this.mode="create";
        this.postId=null;
      }
        });
        }
        onImagePicked(event:Event){

          const file=(event.target as HTMLInputElement).files[0];
          this.form.patchValue({image:file});
          this.form.get('image').updateValueAndValidity();
          const reader= new FileReader();
          reader.onload=()=>{
            this.imagePreview= reader.result as string;
          };
          reader.readAsDataURL(file);
        }
        onSavePost() {

          if (this.form.invalid) {
            return;
          }
          this.isLoading=true;
          if(this.mode==="create")
          { this.postsService.addPost(this.form.value.title, this.form.value.content);
          }else{
            this.postsService.updatePost(
            this.postId,
            this.form.value.title,
            this.form.value.content
            );
          }

          this.form.reset();
        }
      }
