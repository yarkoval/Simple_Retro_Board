import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(
    public boardService: BoardService
  ) { }

  ngOnInit(): void {
  }

  onAddComment(event: { id: number, text: string }, columnId: number) {
    this.boardService.addComment(columnId, event.id, event.text)
  }

  onDeleteComment(comment: any, columnId: number, item: any) {
    this.boardService.deleteComment(columnId, item.id, comment.id )
  }

  onDeleteCard(cardId: number, columnId: number) {
    this.boardService.deleteCard(cardId, columnId)
  }

  onAddCard(text: string, columnId: number) {
    if (text) {
      this.boardService.addCard(text, columnId)
    }
  }

  onDeleteColumn(columnId: number) {
    this.boardService.deleteColumn(columnId)
  }

  onChangeLike(event: { card: any, increase: boolean }, columnId: number) {
    const { card: { id }, increase } = event
    this.boardService.changeLike(id, columnId, increase)
  }
  // todo = ['Get to work', 'Pick up groceries', 'Go home'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', ];

  // progress = ['progress', 'progress', 'progress'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  // data= [
  //   this.done,
  //   this.todo,
  //   this.progress
  // ]
}
