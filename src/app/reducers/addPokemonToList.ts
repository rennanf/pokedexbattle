import { pokemonStatType, pokemonStatsType, pokemonTypeInterface, userPokemonsType } from "../../utils/Types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { getUserPokemons } from "../reducers/getUserPokemons";
import { userInfo } from "os";

export const addPokemonToList = createAsyncThunk("pokemon/addPokemon", 
async(pokemon:{
    id:number;
    name:string;
    types:pokemonTypeInterface[] | string[],
    stats?: pokemonStatsType[];
},{getState, dispatch}) => {
    try {
        const{app:{userInfo}, pokemon:{userPokemons},} = getState() as RootState;
        if(!userInfo?.email){
            return dispatch(setToast("Por favor faça o login para adicionar pokemons a sua lista")
            );
        }
        const index = userPokemons.findIndex((userPokemon:userPokemonsType)=>
        {
            return userPokemon.name===pokemon.name;
        });
        if(index===-1){
            let types:string[] = [];
            // types=pokemon.types as string[];
            if(!pokemon.stats){
                pokemon.types.forEach((type:any)=>
                    types.push(Object.keys(type).toString())
                );
            }else {
                types = pokemon.types as string[];
            }
            await addDoc(pokemonListRef, {
                pokemon:{id:pokemon.id,name: pokemon.name, types},
                email: userInfo.email,
            });
            await dispatch(getUserPokemons());

            return dispatch(setToast(`${pokemon.name} adicionado a sua lista`));
                }else {
            return dispatch(setToast(`${pokemon.name} já existe na sua lista`));
                }
    }catch(err){
        console.log(err);
    }
});