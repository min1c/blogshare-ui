import { Component, OnInit, Input } from '@angular/core';

import { Comment, Reply } from '../comment';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  @Input() comment: Comment;

  showUserReplyElements: boolean = false;
  showReplyElements: boolean = false;
  showUserReplyButton: any = 'Reply';
  showRepliesButton: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
    if (this.comment.replies != null)
    {
      this.showRepliesButton = !this.showReplyElements? 'Show ' : 'Hide '; 
      this.showRepliesButton += this.comment.replies.length;
      this.showRepliesButton += this.comment.replies.length > 1? ' Replies': ' Reply';
    }
  }

  toggleUserReply()
  {
    this.showUserReply(!this.showUserReplyElements);
  }

  showUserReply(show: boolean)
  {
    this.showUserReplyElements = show;
    if (show)
      this.showUserReplyButton = 'Close';
    else
      this.showUserReplyButton = 'Reply';
  }

  toggleReplies() 
  {
    this.showReplies(!this.showReplyElements) ;
  }

  showReplies(show: boolean) 
  {
    this.showReplyElements = show;
    if (show)
      this.showRepliesButton = 'Hide ';
    else
      this.showRepliesButton = 'Show ' + this.comment.replies.length;

    if (this.comment.replies.length > 1)
      this.showRepliesButton += ' Replies';
    else
      this.showRepliesButton += ' Reply';
  }

  postComment(content: string, parentId: number, postId: number) : void
  {
    if (!content) { return; }
    let comment = {content, parentId, postId } as Comment;
    this.postService.postComment(comment)
      .subscribe(reply => {
        this.comment.replies = this.comment.replies || [];
        this.comment.replies.push(reply);
      });
    this.showUserReply(false);
    this.showReplies(true);
  }

  deleteComment(id: number) : void
  {
    this.postService.deleteComment(id).subscribe();
  }

}
