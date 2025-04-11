import { BookData } from "../types.ts";

type Props = {
  name: string;
  bio?: string;
  books: BookData[];
};

export default function AuthorDetails({ name, bio, books }: Props) {
  return (
    <div class="author-container">
      <h1>{name}</h1>
      {bio && <p>{bio}</p>}

      <h2>Libros del autor</h2>
      <div class="grid">
        {books.map((book) => (
          <a href={`/book/${book.id}`} class="bookcard">
            <img
              src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
              alt={book.title}
              class="cover"
            />
            <div class="info">
              <h3>{book.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
