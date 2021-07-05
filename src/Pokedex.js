import React, { useState, useEffect } from 'react';

import { AppBar, Toolbar, Typography, Grid, TextField, Card, CardMedia, CardContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';


import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import array from './MockData';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toFirstCharUppercase } from './contant';

import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    PokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingBottom: '50px',
        paddingRight: '50px',
        // backgroundColor: 'red'
    },
    cardmedia: {
        margin: 'auto'
    },
    cardcontent: {
        textAlign: 'center'
    },
    searchContainer:{
        display: 'flex',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    searchIcon:{
        alignSelf: "flex-end",
        marginBottom: "5px",
    },


}));

export default function Pokedex(props) {
    //console.log(props);
    const { history } = props;

    const [pokemondata, setpokemondata] = useState({})
    const [filter, setfilter] = useState(" ")

    const handleSearchFilter =(e) =>{
        console.log(e.target.value)
        setfilter(e.target.value)
    }

    console.log('pokedex executed')


    const classes = useStyles();
    //   console.log(array[1].name);
    //console.log(pokemondata);
    //console.log(Object.keys(pokemondata));
    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,

                    }
                })
                setpokemondata(newPokemonData)
            })
            .catch(function (err) {
                setpokemondata({})
            })

    }, [])


    const getpokemoncard = (pokemonId) => {
        // console.log(pokemonId);
        //console.log(pokemondata[pokemonId]);
        const { id, name, sprite } = pokemondata[pokemonId];

        return (
            <Grid item xs={12} sm={6} md={3} key={pokemonId}>
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardmedia}
                        image={sprite}
                        style={{ width: '130px', height: '130px' }}
                    />
                    <CardContent className={classes.cardcontent}>
                        <Typography >{`${id}.${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
    //console.log(pokemondata);
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField
                           onChange={handleSearchFilter}
                           label="Pokemon" 
                           variant='standard'
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemondata ? (
                <Grid container spacing={2} className={classes.PokedexContainer}>
                    {Object.keys(pokemondata).map(pokemonId =>
                      pokemondata[pokemonId].name.includes(filter) &&
                        getpokemoncard(pokemonId))}


                </Grid>
            ) : (
                <CircularProgress color="secondary" />
            )}

        </>
    );
}
