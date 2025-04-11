
  type Props = {
    id: string;
    title: string;
    description?: string;
    year?: string;
    pages?: number;
    coverId?: number;
    authorName: string;
    authorId: string;
  };
  
  export default function BookDetails(props: Props) {
    return (
      <div class="book-details">
        <h1>{props.title}</h1>
        {props.coverId && (
          <img
            src={`https://covers.openlibrary.org/b/id/${props.coverId}-L.jpg`}
            alt={`Portada de ${props.title}`}
          />
        )}
        <p><strong>Autor:</strong> <a href={`/author/${props.authorId}`}>{props.authorName}</a></p>
        {props.year && <p><strong>Año de publicación:</strong> {props.year}</p>}
        {props.pages && <p><strong>Número de páginas:</strong> {props.pages}</p>}
        {props.description && <p><strong>Descripción:</strong> {props.description}</p>}
      </div>
    );
  }
  