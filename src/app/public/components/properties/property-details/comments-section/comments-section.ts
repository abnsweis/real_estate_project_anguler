import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IComment } from '../../../../../core/models/Interfaces/Icomment.interface';

@Component({
  selector: 'app-comments-section',
  standalone: false,
  templateUrl: './comments-section.html',
  styleUrl: './comments-section.css'
})
export class CommentsSection {
  @Input() comments: IComment[] = [];
  @Output() commentToParent = new EventEmitter<string>();
  public onCommentFromChild(comment: string) {
    this.commentToParent.emit(comment);
  }
}
