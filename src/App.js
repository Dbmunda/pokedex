import React from 'react'
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';
import { Switch , Route } from 'react-router-dom';
function App() {
  return (
    <Switch>
      <Route 
      exact path="/" 
      render={(props)=> <Pokedex {...props}/>}
      />
     {/* <Route 
      exact path="/:pokemonId" 
      render={(props)=> <Pokemon {...props}/>}
      /> */}
      <Route exact path="/:pokemonId" component={Pokemon} />
      
    </Switch>
  );
}

export default App;
