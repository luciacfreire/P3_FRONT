import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import BookDetails from "../../components/BookDetails.tsx";

type BookInfo = {
  id: string;
  title: string;
  description?: string;
  year?: string;
  pages?: number;
  coverId?: number;
  authorName: string;
  authorId: string;
};

type Data = {
  book: BookInfo;
};

export const handler: Handlers<Data> = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const id = ctx.params.id;
    try {
      const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
      const book = res.data;

      const authorKey = book.authors?.[0]?.author?.key; 
      const authorId = authorKey?.replace("/authors/", "") ?? "unknown";
      let authorName = "Autor desconocido";

      if (authorKey) {
        const authorRes = await axios.get(`https://openlibrary.org${authorKey}.json`);
        authorName = authorRes.data.name;
      }

      const bookData: BookInfo = {
        id,
        title: book.title,
        description: typeof book.description === "string" ? book.description : book.description?.value,
        year: book.first_publish_date ?? book.created?.value?.slice(0, 4),
        pages: book.number_of_pages,
        coverId: book.covers?.[0],
        authorName,
        authorId,
      };

      return ctx.render({ book: bookData });

    } catch (_e) {
      return new Response("Error al obtener los detalles del libro", { status: 500 });
    }
  },
};

export default function Page(props: PageProps<Data>) {
  const book = props.data.book;

  return (
    <div class="container">
      <BookDetails {...book} />
    </div>
  );
}

