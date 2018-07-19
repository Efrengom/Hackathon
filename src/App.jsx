import React, { Component } from 'react'
import axios from 'axios';
import Mapping from './Mapping'

class App extends Component {
    constructor(props) {

        super(props)

        this.state = {
            giphy: 'Sg3hJM9UyVuu6VbiyhDOvILZn9mdMkCE',
            search: '',
            gifRes: null,
            statArr: null,
            pokemonSpeed: 0,
            pokemonSpecialAtk: 0,
            pokemonHealth: 0,
            pokemonSpecialDef: 0,
            pokemonAtk: 0,
            pokemonDef: 0,
            pokemonType1: '',
            pokemonType2: '',

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    handleChange(e) {
        this.setState({
            search: e.target.value
        })
    }

    handleButton() {
        this.componentWillMount()
    }

    componentWillMount() {
        axios.get("http://api.giphy.com/v1/gifs/search?q=" + this.state.search + '&api_key=' + this.state.giphy + '&rating=g')
            .then((response) => {
                this.setState({
                    gifRes: response.data.data,
                })
                console.log(this.state.gifRes)
                axios.get('http://pokeapi.co/api/v2/pokemon/' + this.state.search)
                .then((response) => {
                    console.log(response)
                    
                       var statArr = response.data.stats
                    if (response.data.types.length > 1){
                    this.setState({
                        pokemonHealth: statArr[5].base_stat,
                        pokemonAtk: statArr[4].base_stat,
                        pokemonDef: statArr[3].base_stat,
                        pokemonSpeed: statArr[0].base_stat,
                        pokemonSpecialAtk: statArr[2].base_stat,
                        pokemonSpecialDef: statArr[1].base_stat,
                        pokemonType1: response.data.types[0].type.name,
                        pokemonType2: response.data.types[1].type.name,
                    })
                } else{
                    this.setState({
                        pokemonHealth: statArr[5].base_stat,
                        pokemonAtk: statArr[4].base_stat,
                        pokemonDef: statArr[3].base_stat,
                        pokemonSpeed: statArr[0].base_stat,
                        pokemonSpecialAtk: statArr[2].base_stat,
                        pokemonSpecialDef: statArr[1].base_stat,
                        pokemonType1: response.data.types[0].type.name,
                        pokemonType2: '',

                    })
                }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() { 
        let Map2
        if (this.state.gifRes === null){
            Map2 = () => <div></div>
        }
        else{
            Map2 = () => <Mapping
            gifRes={this.state.gifRes}
            />
        }

        let P 
        if(this.state.pokemonType2.length < 1){
            P = () => <p></p>
        } else {
            P = () => <p>Type: {this.state.pokemonType2}</p>
        }

        let D 
        if(this.state.pokemonHealth != 0) {
            D = () => <div className='stats'>
            <p>Type: {this.state.pokemonType1}</p>
            <P/>
            <p>Health: {this.state.pokemonHealth}</p>
            <p>Speed: {this.state.pokemonSpeed}</p>
            <p>Attack: {this.state.pokemonAtk}</p>
            <p>Defense: {this.state.pokemonDef}</p>
            <p>Special Attack: {this.state.pokemonSpecialAtk}</p>
            <p>Special Defense: {this.state.pokemonSpecialDef}</p>
        </div>
        } else {
            D = () => <div></div>
        }

        return (
            <div>
                <h1 className='Title'>Giphymon</h1>
                <div className='row'>
                <textarea value={this.state.search} onChange={this.handleChange} placeholder='Enter a Pokémon Name'></textarea>
                <a>
                    <button onClick={this.handleButton} className='button'>Check Stats</button>
                </a>
                </div>
                <D/>
                

                <Map2 />
                
            </div>
            

        )

    }


}
export default App;