import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentService } from '../comment.service';

export const commentGuard: ResolveFn<any> = (route, state) => {
  const commentService = inject(CommentService);
  return commentService.getComments(); // Fetch comments before navigating
};