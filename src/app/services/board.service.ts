import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';





export interface Comment {
    id: number,
    text: string,
}

export interface Card {
    id: number,
    text: string,
    like: number,
    comments: Comment[]
}

export interface Column {
    id: number,
    title: string,
    color: string,
    list: Card[]
}

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    private initBoard =[
        {
            id:1,
            title:'To do',
            color: this.getRandomColor(),
            list: [
                {
                    id:1,
                    text: 'example card item',
                    like: 1,
                    comments: [
                        {
                            id:1,
                            text: 'some comment'
                        }
                    ]

                },
                {
                    id: 2,
                    text: 'example card item 2',
                    like: 1,
                    comments: [
                        {
                            id: 1,
                            text: 'some comment'
                        }
                    ]

                }
            ]
        },
        {
            id: 2,
            title: 'In progress',
            color: this.getRandomColor(),
            list: [
                {
                    id: 2,
                    text: 'example card item',
                    like: 3,
                    comments: [
                        {
                            id: 1,
                            text: 'some comment'
                        },
                        {
                            id: 2,
                            text: 'some another comment'
                        },
                        {
                            id: 3,
                            text: 'one more comment'
                        }
                    ]

                }
            ]
        }
    ]
    private savedBoard: any[] = JSON.parse(localStorage.getItem("board$")!);
    private initBoard2: any = this.savedBoard || this.initBoard;
    private board: any[] = this.initBoard2;
    
    private board$ = new BehaviorSubject<any[]>(this.initBoard2);
    private color = '#';
    private letters = '0123456789ABCDE';
    
  
    saveApp(val: any){
        localStorage.setItem("board$", JSON.stringify(val));
    }
    
    getRandomColor() {
        
        let  color = '#';
        for (let i = 0; i < 3; i++)
            color += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
        return this.color= color;
    // for (var i = 0; i < 6; i++) {
    //     this.color += this.letters[Math.floor(Math.random() * 15)];
    // }
    // return this.color
}
        
   getBoard$() {
      return this.board$. asObservable()
   }

    // deleteComment(columnId: number, itemId: number, commentId: number ) {
    //     this.board = this.board.filter((column: Column) => column.id !== columnId);
    //     this.board$.next([...this.board]);
    // }
    addComment(columnId: number, cardId: number, text: string) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                const list = column.list.map((card: Card) => {
                    if (card.id === cardId) {
                        const newComment = {
                            id: Date.now(),
                            text,
                        };
                        card.comments = [newComment, ...card.comments];
                    }
                    return card;
                });

                column.list = list;
            }
            return column;
        });

        this.board$.next([...this.board]);
        this.saveApp([...this.board]);
    }

    deleteComment(columnId: number, itemId: number, commentId: number) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                const list = column.list.map((item) => {
                    if (item.id === itemId) {
                        item.comments = item.comments.filter((comment: Comment) => {
                            return comment.id !== commentId
                        })
                    }
                    return item
                })
                column.list = list
            }
            return column
        })
        this.board$.next([...this.board])
        this.saveApp([...this.board]);
    }

    changeLike(cardId: number, columnId: number, increase: boolean) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                const list = column.list.map((card: Card) => {
                    if (card.id === cardId) {
                        if (increase) {
                            card.like++;
                        } else {
                            
                                card.like--;
                            
                        }
                    }
                    return card;
                });

                column.list = list;
                return column;
            } else {
                return column;
            }
        });

        this.board$.next([...this.board]);
        this.saveApp([...this.board]);
    }

    deleteCard(cardId: number, columnId: number) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                column.list = column.list.filter((card: Card) => card.id !== cardId);
            }
            return column;
        });

        this.board$.next([...this.board]);
        this.saveApp([...this.board]);
    }

    deleteColumn(columnId: number) {
        this.board = this.board.filter((column: Column) => column.id !== columnId);
        this.board$.next([...this.board]);
        this.saveApp([...this.board]);
    }

    addCard(text: string, columnId: number) {
        const newCard: Card = {
            id: Date.now(),
            text,
            like: 0,
            comments: [],
        };

        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                column.list = [newCard, ...column.list];
            }
            return column;
        });

        this.board$.next([...this.board]);
        this.saveApp([...this.board]);
    }

    addColumn(title: string) {

        
        
        const newColumn: Column = {
            id: Date.now(),
            title: title,
            color: this.getRandomColor(),
            list: [],
        };

        this.board = [...this.board, newColumn];
        this.board$.next([...this.board]);
        this.saveApp([...this.board]);
    }
    
}