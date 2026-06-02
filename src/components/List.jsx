import axios from "axios";
import { useEffect , useState } from "react";


const PokemonList =() => {
const [pokemon,setPokemon]=useState([])

useEffect(() => {
const fetchPokemon = async () => {
    try {
      const response =  await axios.get(import.meta.env.VITE_POKEMON_API)

      // if we dont put inside promise.all so when we console.log() the return data is 100 with [promised ,promised]
      // an because we turen the map into an async function to get the pokemon.url 
      const pokemonWithDetail = await  Promise.all(
      response.data.results.map( async (pokemon) => {
      // get id from url
        // split the url of images into an array and remove the empty string so we use boolean and pop js method to get last one
      const id =pokemon.url.split("/").filter(Boolean).pop();


      // fetch the pokemon details types,stats ,abilities
        const pokemonDetails = await axios.get(pokemon.url);


      return {
        ...pokemon,
       image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          type:pokemonDetails.data.types[0].type.name
       
      }

      
      })
      )

      console.log(pokemonWithDetail)
      setPokemon(pokemonWithDetail)

    }catch (error) {
      console.error("Error requesting data:", error.message);
    
    }
}

fetchPokemon();
},[])


return (
<main className="max-w-6xl mx-auto border h-auto px-1">
    <section className="h-auto border bg-NGray p-2 ">
        <h2>Curreted list of  not in order  of pokemon</h2>
    
<ul className="h-s border overflow-hidden flex flex-row  flex-wrap gap-4 p-3 items-center justify-center ">
{pokemon.map((item,index) => (
<li key={index} className="border-3 h-100 rounded-xl w-80 m-0 px-5 border-CardBlue bg-white">

<div className="flex flex-row justify-between ">
<p className="text-lg text-left">{item.name}</p>
<p>{item.type}</p>
</div>
  <div className="max-w-xs border bg-CardCream  rounded-md">
    <picture>
     <img src={item.image} alt="pokemon_hero_image" className="place-self-center w-50 h-50" />
    </picture>
  
  </div>

<div>



</div>


</li>
))}
</ul>    
    
    
    
    
    
    </section>
</main>

)
}
export default PokemonList;