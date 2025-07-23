import { Component, EventEmitter, Output } from '@angular/core';
import { CommentsService } from '../../../../../../core/services/comments.service';

@Component({
  selector: 'app-add-comment',
  standalone: false,
  templateUrl: './add-comment.html',
  styleUrl: './add-comment.css'
})
export class AddComment {
  commentText: string = '';

  @Output() commentAdded: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _commentsService: CommentsService) {

  }


  sendComment() {
    console.log(this.commentText);
    if (this.commentText.trim()) {
      this.commentAdded.emit(this.commentText.trim());
      this.commentText = '';
    }

  }
}
