import { useEffect, useState } from "react";

const Home = () => {
  const url = 'https://animes5.p.rapidapi.com/';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8e15249e3fmsh1611052637553d5p143ef6jsn622458d30cf0',
      'X-RapidAPI-Host': 'animes5.p.rapidapi.com'
    }
  };

  const [animes, setAnimes] = useState([]);
  const [IsLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setAnimes(data.animes);
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  
  const handleSearch = async () => {

    setIsLoading(true)
    let url = `https://animes5.p.rapidapi.com/?q=${search}`
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setAnimes(data.animes)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      } catch(error) {
        console.log(error)
      }
};


  return (
    <>
    {IsLoading && 
    <div className="container">
    <section class="dots-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </section>
    </div>
  }

{
  !IsLoading &&
  <div class="input__container">
  <div class="shadow__input"></div>
  <button class="input__button__shadow" onClick={handleSearch}>
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
      <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
    </svg>
  </button>
  <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="text" class="input__search" placeholder="What do you want to search?"/>
</div>
}
    <div className="cards">
      {!IsLoading && animes && animes.map((anime) => (
        <div key={anime.id} className="flip-card">
          <div key={anime.id} className="flip-card-inner">

          <div key={anime.id} className="flip-card-front">
          <p className="titleText">Title: {anime.title}</p>
          <p className="engTitle">Title (English): {anime.title_english}</p>
          </div>

          <div key={anime.id} className="flip-card-back">
          <img src={anime.main_picture.large} alt={anime.title} style={{"box-shadow":"0 0 50px 1px #48abe0","height":"80%", "border-radius":"20px"}}/>

          <button>WATCH NOW</button>
          </div>

          </div>
        </div>

        
      ))}
      </div>

      <h1 className="name">@sibghatcodez</h1>
    </>
  );
};

export default Home;
