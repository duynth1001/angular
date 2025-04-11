import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { map, Observable, pluck } from 'rxjs';
import { Comments } from './comment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {


  comment$:Observable<Comments[]>;

  cmt$:Observable<Comments[]>;

  constructor(private commentService:CommentService,
    private activatedRoute:ActivatedRoute
  ) { 
    this.comment$=this.commentService.getComments();
    this.cmt$=this.activatedRoute.data.pipe(
      pluck('comment')
    )
  }

  ngOnInit(): void {
  
  }
  
}
