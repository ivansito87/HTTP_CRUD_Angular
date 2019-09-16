import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostsComponent } from "./posts/posts.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule, MatListModule, MatInputModule, MatButtonModule, MatGridListModule } from "@angular/material";
import { PostService } from "./services/post.service";
import { AppErrorHandler } from "./common/app-error-handler";


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
  ],
  providers: [
    PostService,
    // we are telling Angular that anywhere you are using the Error
    // Handler that comes from the package you want to use the custom created one
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
