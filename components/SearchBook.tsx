const Page = () => {
    return (
      <div>
        <form method="GET" action="/search">
          <input type="text" name="book" class="input" placeholder="Buscar libro"/>
          <button type="submit" class="button">Buscar</button>
        </form>
      </div>
    );
  };
  
  export default Page;
  