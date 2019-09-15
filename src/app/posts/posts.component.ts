import { Component, NgModule, OnInit } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { PostService } from "../services/post.service";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { BadInput } from "../common/bad-input";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule],
})

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})

export class PostsComponent implements OnInit {

  // :TODO this class violates the separation of concerns principle because it is
  // doing to many things at the same time, like in a restaurant the chef should only care about cooking
  // private posts = [];

  posts: Object;

  constructor(private service: PostService) {
  }

  // called with the button click on html
  get_posts() {
    // extracted from the service
    this.service.get_products()
      .subscribe(response => {
        this.posts = response;
      }, error => {
        alert("Unexpected error has occurred!");
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

  // similar to component did mount React
  // ngOnInit() {
  //   this.httpClient.get(this.baseUrl)
  //     .subscribe((response: any[]) => {
  //       this.posts = response;
  //       console.log(this.posts);
  //     });
  // }

  createPost(inputElement: HTMLInputElement) {
    let post = {title: inputElement.value};
    inputElement.value = "";
    // calling the method from the service module
    this.service.httpCreatePost(post)
      .subscribe((response: any) => {
        post['id'] = response.id;
        // @ts-ignore
        this.posts.splice(0, 0, post);
      }, (error: Response) => {
        if(error instanceof BadInput) {
          // there are better ways of handling the errors when
          // one common method in Angular is to use the
          // this.form.setErrors(error.json());
          console.log("error", error);
        } else {
          alert("Unexpected error has occurred!");
          console.log(error);
        }
      });
  }

  updatePost(post) {
    this.service.updatePost(post.id)
      .subscribe(response => {
        console.log("response from the patch method", response);
      }, error => {
        alert("Unexpected error has occurred!");
        console.log(error);
      })
  }

  deletePost(post) {
    this.service.deletePost(post.id)
      .subscribe(response => {
        // @ts-ignore
        let index = this.posts.indexOf(post);
        // @ts-ignore
        this.posts.splice(index, 1);
        console.log("success on delete");
      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert("This post has already been deleted")
        } else {
          alert("Unexpected error has occurred");
          console.log(error);
        }
      })
  }

}

