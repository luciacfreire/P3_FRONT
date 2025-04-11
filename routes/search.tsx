import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import BookCard from "../components/BookCard.tsx";
import SearchBook from "../components/SearchBook.tsx";
import { BookData } from "../types.ts";


export const handler: Handlers<BookData[]> = {
  GET: async (req: Request, ctx: FreshContext<BookData>) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("book");  
    const books: BookData[] = [];

    if (query) {
      try {
        const res = await axios.get(
          `https://openlibrary.org/search.json?q=${query}`
        );
        const bookDocs = res.data.docs;

        bookDocs.forEach((book: any) => {
          if (book) {
            books.push({
              id: book.key.replace("/works/", ""),
              title: book.title,
              author: book.author_name?.[0] ?? "Autor desconocido",
              coverId: book.cover_i,
            });
          }
        });

        if (books.length === 0) {
          books.push({
            id: "", 
            title: "No se encontraron libros",
            author: "",
            coverId: undefined,
          });
        }

        return ctx.render(books);
      } catch (error) {
        console.error(error);
        return new Response("Error al obtener libros");
      }
    } else {
      return ctx.render([]);
    }
  },
};

export default function Page(props: PageProps<BookData[]>) {
  const data = props.data;

  return (
    <div>
      <div class="containerForm">
        <SearchBook />
      </div>

      <div class="container">
        <div class="grid">
          {
            data.map((book) => (
              <BookCard key={book.id} {...book} />
            ))
            }
        </div>
      </div>
    </div>
  );
}
