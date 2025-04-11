import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import AuthorDetails from "../../components/AuthorDetails.tsx";
import { BookData } from "../../types.ts";

type AuthorPageData = {
  name: string;
  bio?: string;
  books: BookData[];
};

export const handler: Handlers<AuthorPageData> = {
  async GET(_req:Request, ctx:FreshContext) {
    const { id } = ctx.params;

    try {
      const authorRes = await fetch(`https://openlibrary.org/authors/${id}.json`);
      if (!authorRes.ok) throw new Error("Autor no encontrado");

      const authorData = await authorRes.json();

      const bio = typeof authorData.bio === "string"
        ? authorData.bio
        : authorData.bio?.value;

      const worksRes = await fetch(`https://openlibrary.org/authors/${id}/works.json`);
      const worksData = await worksRes.json();

      const books: BookData[] = worksData.entries
        .slice(0, 6)
        .map((work: any) => ({
          id: work.key.replace("/works/", ""),
          title: work.title,
          coverId: work.covers?.[0],
        }));

      return ctx.render({
        name: authorData.name,
        bio,
        books,
      });
    } catch (error) {
      return new Response("Autor no encontrado", { status: 404 });
    }
  },
};

export default function AuthorPage({ data }: PageProps<AuthorPageData>) {
  return <AuthorDetails name={data.name} bio={data.bio} books={data.books} />;
}
