import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Comment } from '../comment';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})

export class PostDetailComponent implements OnInit {
  postForm: FormGroup;
  post: Post;
  commentMap: Map<number, Comment>;
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService) { 
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      
    });
  }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => {
        this.post = post;
        this.initCommentMap();

      })
  }

  initCommentMap(): void 
  {
    this.commentMap = new Map();

    for (let comment of this.post.comments)
    {
      this.commentMap.set(comment.id, comment);
    }

    for (let key of Array.from(this.commentMap.keys())) 
    {
      let comment = this.commentMap.get(key);
      let parentId = comment.parentId;
      if (parentId != null && parentId > 0)
      {
        let parentComment = this.commentMap.get(parentId);
        parentComment.replies = parentComment.replies || [];
        parentComment.replies.push(comment);
      }
    }
  }

  getMapKeys(map) {
    return Array.from(map.keys());
  }
  
  getMapValues(map)
  {
    return Array.from(map.values());
  }

  postComment(content: string, postId: number) : void
  {
    if (!content) { return; }
    let comment = {content, postId } as Comment;
    this.postService.postComment(comment)
      .subscribe(newComment => {
        this.post.comments = this.post.comments || [];
        this.post.comments.push(newComment);
      });
  }
}
