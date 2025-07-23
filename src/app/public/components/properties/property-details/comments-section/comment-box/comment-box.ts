import { Component, Input } from '@angular/core';
import { ImagesService } from '../../../../../../core/services/images.service';
import { IComment } from '../../../../../../core/models/Interfaces/Icomment.interface';

@Component({
  selector: 'app-comment-box',
  standalone: false,
  templateUrl: './comment-box.html',
  styleUrl: './comment-box.css'
})
export class CommentBox {
  userImage: string = '';

  @Input() comment!: IComment;

  constructor(private imageService: ImagesService) {
    this.userImage = imageService.getImageUrl('user-1.png', 'gallery');
  }
}
