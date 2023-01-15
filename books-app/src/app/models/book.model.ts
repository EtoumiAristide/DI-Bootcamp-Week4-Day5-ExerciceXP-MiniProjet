export class Book {
    constructor(
        public title: string,
        public authors: string[],
        public coverImage: string) {
        this.previewMode = true;
    }
    
    previewMode: Boolean

    getAuthorsList(): string {
        if (this.authors !== undefined) {
            return this.authors.join(", ");
        } else {
            return "";
        }
    }
}
