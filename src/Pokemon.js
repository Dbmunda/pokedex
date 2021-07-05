import React, { useState ,useEffect} from 'react'
// import MockData from './MockData';

import { Typography } from '@material-ui/core';
import { Link, CircularProgress, Button } from '@material-ui/core';

import { toFirstCharUppercase } from './contant';
import axios from 'axios';
import Pokemonbeauty from './Pokemonbeauty'
const Pokemon = (props) => {
    const { history,match } = props;
    const { params } = match;
    const { pokemonId } = params;
    //console.log(props);
    //console.log(props.match.params.pokemonId);
    const [pokemon, setpokemon] = useState(undefined);

    useEffect(() => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
          .then(function (response) {
            const { data } = response;
            setpokemon(data);
          })
          .catch(function (error) {
            setpokemon(false);
          });
      }, [pokemonId]);

    const generatepokemonJSX = (pokemon) => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <>
                {/* <Typography variant='h1'>{id}.{toFirstCharUppercase(name)} <img src={front_default}  alt=" "/></Typography>
                <img
                    src={fullImageUrl}
                    style={{ width: '300px', height: '300px' }}
                    alt=" "
                   
                />
                <Typography variant='h3'>Pokemon Info</Typography>
                <Typography>
                    Species:
                    <Link href={species.url}>{species.name} </Link>
                </Typography>
                <Typography>Weight: {weight}</Typography>
                <Typography>Height: {height}</Typography>
                <Typography variant='h6'>Types: </Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}>{name}</Typography>
                })

                } */}
                <Pokemonbeauty pokemon={pokemon}/>
            </>
        )
    }
    return (
        <>
            {pokemon === undefined && <CircularProgress size={70} style={{marginLeft: '50vw',marginTop:'50vh'}}/>}
            {pokemon !== undefined && pokemon &&  generatepokemonJSX(pokemon)}
            {pokemon === false && <Typography> Pokemon not found</Typography>}

            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push("/")}>
                    back to pokedex
                </Button>
            )}
        </>
    )
}

export default Pokemon
