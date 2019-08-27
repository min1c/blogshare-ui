import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDURVUQTa3-gpWDIGL8o2jLLotDBZUytRQ',
      apiVersion: '3.31'
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    PostsComponent,
    PostDetailComponent,
    CommentDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }