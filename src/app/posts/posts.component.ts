import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";


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
  private baseUrl = "https://jsonplaceholder.typicode.com/posts";
  posts: string[];
  constructor(private httpClient: HttpClient) {
  }

  get_products() {
    this.httpClient.get(this.baseUrl)
      .subscribe((response: any[]) => {
        this.posts = response;
        console.log(this.posts);
      });
  }

  ngOnInit(): void {
  }

  // similar to component did mount
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
    this.httpClient.post(this.baseUrl, JSON.stringify(post))
      .subscribe((response: any) => {
        post['id'] = response.id;
        // @ts-ignore
        this.posts.splice(0, 0, post);
        console.log("response", response);
      });
  }

  updatePost(post){
    this.httpClient.patch(`${this.baseUrl}/${post.id}`, JSON.stringify({isRead: true}))
      .subscribe(response => {
        console.log("response from the patch method", response);
      })
  }

  deletePost(post){
    this.httpClient.delete(`${this.baseUrl}/${post.id}`)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
    })
  }
}

