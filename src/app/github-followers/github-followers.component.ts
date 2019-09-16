import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { GithubFollowersService } from "../github-followers.service";
//===========  =================================================
// import { MatButtonModule, MatCheckboxModule } from "@angular/material";



@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  followers: any[];

  constructor(private service: GithubFollowersService) { }

  ngOnInit() {
   this.service.getAll()
      .subscribe(followers => {
        console.log(followers);
        this.followers = followers
      } );
  }

}
