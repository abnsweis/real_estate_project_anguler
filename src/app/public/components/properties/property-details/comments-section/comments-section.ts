import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IComment } from '../../../../../core/models/Interfaces/Icomment.interface';
import { CommentsService } from '../../../../../core/services/comments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments-section',
  standalone: false,
  templateUrl: './comments-section.html',
  styleUrl: './comments-section.css'
})
export class CommentsSection {
  @Input() comments: IComment[] = [];
  @Output() commentToParent = new EventEmitter<string>();
  @Output() onUpdateComment = new EventEmitter<{ commentText: string; commentId: string }>();

  constructor(private commentsService: CommentsService, private toastr: ToastrService) {

  }

  public onCommentFromChild(comment: string) {
    this.commentToParent.emit(comment);
  }

  updateCommentEvent(commentInfo: { commentText: string; commentId: string }) {
    this.onUpdateComment.emit(commentInfo);
  }


  deletecomment(data: { propertyId: string; commentId: string }) {
    console.log(data.commentId)
    this.commentsService.deleteComment(data.commentId).subscribe({
      next: () => {
        this.toastr.success('تم حذف التعليق بنجاح');
        this.commentsService.getProprtyComments(data.propertyId).subscribe({
          next: (res) => {
            this.comments = res.items;
          },
        });
      },
      error: (error) => {
        console.log(error.error)
        this.toastr.error('فشلة عملية حذف التعليق الرجاء المحاولة مرة اخرى');
      }
    });

  }
}
