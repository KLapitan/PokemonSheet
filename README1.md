june 2 :

so the problem we want to get the type of a pokemon

pokemon type

pikachu electric
squirtle water
bulbasaur grass

so the problem how can we get the type

so we thought the we fetched on first is we can use the data itself but the first we fetched is the number of pokemon we want to display

so for us to get that

we have created a pokemonwithimage function that is map to get the data for all pokemon we want

so we created a variable pokemondetails and get the the pokemon.url to get that data

so the data structure is like this first

{
results: [
{
name: "bulbasaur",
url: "https://pokeapi.co/api/v2/pokemon/1/"
},
{
name: "ivysaur",
url: "https://pokeapi.co/api/v2/pokemon/2/"
},
{
name: "venusaur",
url: "https://pokeapi.co/api/v2/pokemon/3/"
}
]
}

so we get that data and save to our state pokemon

now for us to get each pokemon details

we fetch it like this

const pokemonInfo = await axios.get(pokemon.url)

so the url is the data for the pokemone hero itself thats why we use it

so we used it and

target the types :

so in types is in an object that contains 1 or more types

but we need is only one so we get data.types[0].type.name for

type: {
name:grass

}

after that we console.log(pokemonInfo)

# Why did I get `[Promise, Promise, Promise]`?

## Step 1: First fetch only gets the Pokémon list

```js
const response = await axios.get(API_URL);
```

This does **NOT** get full Pokémon details.

It only returns:

```js
[
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
];
```

Meaning:

✅ name
✅ url

But NOT:

❌ type
❌ image
❌ stats

---

## Step 2: We use `.map()` to loop through Pokémon

```js
response.data.results.map((pokemon) => {});
```

This loops over every Pokémon.

Like:

```js
bulbasaur;
ivysaur;
venusaur;
```

---

## Step 3: We need more details

To get type, stats, etc., we fetch again:

```js
await axios.get(pokemon.url);
```

Example:

```js
await axios.get("https://pokeapi.co/api/v2/pokemon/1/");
```

This gives:

```js
{
  name: "bulbasaur",
  types: [...],
  sprites: {...}
}
```

---

## Step 4: Problem — `await` only works in `async`

This will FAIL:

```js
map((pokemon) => {
  const details = await axios.get(
    pokemon.url
  );
});
```

Because `await` needs `async`.

So we change it:

```js
map(async (pokemon) => {
  const details = await axios.get(pokemon.url);
});
```

---

## Step 5: New problem — `async` returns Promise

When callback becomes `async`:

```js
map(async (pokemon) => {});
```

The result becomes:

```js
[Promise, Promise, Promise];
```

Why?

Because JavaScript is still waiting for the fetch to finish.

---

## Step 6: Fix with `Promise.all()`

We tell JavaScript:

> "Wait for ALL promises to finish"

```js
const pokemonWithImage = await Promise.all(
  response.data.results.map(async (pokemon) => {
    const details = await axios.get(pokemon.url);

    const id = pokemon.url.split("/").filter(Boolean).pop();

    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      type: details.data.types[0].type.name,
    };
  }),
);
```

Now the result becomes:

```js
[
  {
    name: "bulbasaur",
    image: "...",
    type: "grass",
  },
];
```

instead of:

```js
[Promise, Promise];
```

---

## Easy rule to remember

If you see:

```js
map(async () => {});
```

Ask yourself:

> "Do I need `Promise.all()`?"

Usually:

**YES**.
