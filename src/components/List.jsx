import axios from "axios";
import { useEffect , useState } from "react";


const PokemonList =() => {
const [pokemon,setPokemon]=useState([])

useEffect(() => {
const fetchPokemon = async () => {
    try {
      const response =  await axios.get(import.meta.env.VITE_POKEMON_API)


      console.log(response.data.results)
      setPokemon(response.data.results)

    }catch (error) {
      console.error("Error requesting data:", error.message);
    
    }
}

fetchPokemon();
},[])


return (
<main className="max-w-7xl mx-auto border h-screen px-8">
    <section className="h-screen border bg-NGray ">
        <h2>Curreted list of  not in order  of pokemon</h2>
    
<ul className="h-110 border overflow-hidden flex flex-col gap-2">
{pokemon.map((item,index) => (
<li key={index}>{item.name}</li>
))}
</ul>    
    
    
    
    
    
    </section>
</main>

)
}
export default PokemonList;