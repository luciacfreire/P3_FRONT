import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import BookCard from "../components/BookCard.tsx";
import { BookData } from "../types.ts";

const featuredBooks = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Hobbit",
  "Moby-Dick",
  "Jane Eyre",
  "War and Peace",
  "The Catcher in the Rye",
  "Brave New World",
  "The Lord of the Rings",
  "Crime and Punishment",
  "The Alchemist",
  "The Picture of Dorian Gray",
  "Harry Potter and the Sorcerer's Stone"
];


export const handler: Handlers<BookData[]> = {
  async GET (_req:Request, ctx: FreshContext<BookData>) {
    const books: BookData[] = [];
    try {
      for(const title of featuredBooks){
        const res = await axios.get(`https://openlibrary.org/search.json?q=${title}`);
  
        const book = res.data.docs[0];
  
        if(book){
          books.push({
            id: book.key.replace("/works/", ""),
            title: book.title,
            author: book.author_name?.[0] ?? "Autor desconocido",
            coverId: book.cover_i,
          })
        }
      }
      return ctx.render(books);
      
    } catch (error) {
      console.error(error);
      return new Response("Error al obtener libros");
    }
  }
}

export default function Page (props:PageProps<BookData[]>) {
  const data = props.data;
  return(
    <div class="container">
      <h1>Explorador de Libros</h1>
      <div class="grid">
        {data.map((book) => (
          <BookCard {...book} />
        ))}
      </div>
    </div>
  );
}