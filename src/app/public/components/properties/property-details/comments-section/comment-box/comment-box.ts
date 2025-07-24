import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImagesService } from '../../../../../../core/services/images.service';
import { IComment } from '../../../../../../core/models/Interfaces/Icomment.interface';
import { CommentsService } from '../../../../../../core/services/comments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-box',
  standalone: false,
  templateUrl: './comment-box.html',
  styleUrl: './comment-box.css'
})
export class CommentBox {
  userImage: string = '';

  @Input() comment!: IComment;
  constructor(private imageService: ImagesService,
    private commentService: CommentsService,
    private toastr: ToastrService) {
    this.userImage = imageService.getImageUrl('user-1.png', 'gallery');
  }

  @Output() onButtonShowDialog = new EventEmitter<{ commentText: string; commentId: string }>();
  @Output() onDeleteComment = new EventEmitter<{ propertyId: string; commentId: string }>();

  onEdit() {
    this.onButtonShowDialog.emit({
      commentText: this.comment.commentText,
      commentId: this.comment.commentID
    });
  }
  onDelete() {
    this.onDeleteComment.emit({
      propertyId: this.comment.propertyId,
      commentId: this.comment.commentID
    })
  }

}
