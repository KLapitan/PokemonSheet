const PokemonNav = () => {
return(
<nav className="max-w-6xl mx-auto h-auto ">
    <section className="h-30 w-full border-2 flex items-center justify-between p-2 ">
          <picture className="h-20 w-40 flex items-center  ">
            <img src="/pokemon_sheet_logo.svg" alt="logo"  className="h-full w-full object-cover "/>
        </picture>

        {/* small view */}
        <picture>
            <img src="/illustration-hamburger.svg" alt="hamburger-icon" className="h-4 md:hidden" />
        </picture>
    </section>

</nav>
)

}
export default PokemonNav