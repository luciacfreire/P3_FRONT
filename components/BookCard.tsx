import { FunctionComponent } from "preact";


type BookProps = {
    id:string,
    title:string,
    author:string,
    coverId?:number
};

const BookCard: FunctionComponent<BookProps> = (props) => {
    const {id, title, author, coverId} = props;

    const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;

    return(
        <a href={`/book/${id}`} class="bookcard">
            <img src={coverUrl} alt={`Cover of ${title}`} class="cover" />
            <div class="info">
                <h3>{title}</h3>
                <p>{author}</p>
            </div>
        </a>
    );
};

export default BookCard;

