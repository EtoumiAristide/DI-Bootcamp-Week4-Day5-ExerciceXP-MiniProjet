import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Book } from "../models/book.model";
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  bookService: BookService;
  books?: Book[];
  searchString: any = "";

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  /*ngOnInit() {
    this.getBooks("");
  }*/
  ngOnInit() {
    this.getBooks();
  }

  /*onSubmit(author: string) {
    this.getBooks(author)
  }*/
  /*onSubmit() {
    this.getBooks(this.searchString)
  }*/
  onSubmit() {
    this.getBooks()
  }

  /*private getBooks(author: string) {
    this.books = this.bookService.getBooks(author)
  }*/

  private async getBooks() {
    this.books = await lastValueFrom(this.bookService.getBooks(this.searchString));
    /*this.bookService.getBooks(this.searchString).then(data => {
      this.books = data;
    })*/
  }

  onClickImage(book: Book) {
    book.previewMode = !book.previewMode;
  }

}
