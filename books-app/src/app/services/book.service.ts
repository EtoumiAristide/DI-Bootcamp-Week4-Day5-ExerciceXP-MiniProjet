import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  apiRoot: string = "https://www.googleapis.com/books/v1/volumes";


  /*private testData: Book[] = [
    new Book("The Coma", ["Alex Garland"], "http://books.google.com/books/content?id=LB2oAAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"),
    new Book("The Beach", ["Alex Garland"], "http://books.google.com/books/content?id=rVIgAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"),
    new Book("La Plage", ["Alex Garland"], "http://books.google.com/books/content?id=EIGdGwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"),
    new Book("The Tesseract", ["Alex Garland"], "http://books.google.com/books/content?id=FOtnB5ATdtMC&printsec=frontcover&img=1&zoom=1&source=gbs_api"),
    new Book("Never Let Me Go (Screenplay)", ["Alex Garland"], "http://books.google.com/books/content?id=0Iq8F_TMa7QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"),
    new Book("Ex Machina", ["Alex Garland"], "http://books.google.com/books/content?id=yvFMBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"),
    new Book("Coma", ["Alex Garland"], "http://books.google.com/books/content?id=TXLwzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"),
    new Book("Beach", ["Alex Garland"], "http://books.google.com/books/content?id=R8mVPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api")
  ]*/

  /*getBooks(author: string): Book[] {
    if (author == "Alex Garland") {
      return this.testData;
    }
    else return [];
  }*/

  /*getBooks(author: string): Promise<Book[]> {
    return new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?q=inauthor:"${author}"&langRestrict=en`;
      console.log(apiURL);
      this.http.get(apiURL).toPromise().then((data: any) => {
        let results: Book[] = data.items.map((item: any) => {
          return new Book(
            item.volumeInfo.title,
            item.volumeInfo.authors,
            item.volumeInfo.imageLinks.thumbnail
          )
        })
        resolve(results);
      });
    });
  }*/
  getBooks(author: string): Observable<Book[]> {
    let apiURL = `${this.apiRoot}?q=inauthor:"${author}"&langRestrict=en`;

    return this.http.get(apiURL).pipe(map((data: any) => {

      return data.items.map((item: any) => {
        return new Book(
          item.volumeInfo.title !== undefined ? item.volumeInfo.title : "",
          item.volumeInfo.authors !== undefined ? item.volumeInfo.authors : [],
          item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.thumbnail : ""
        )
      });

    }));
  }

}
