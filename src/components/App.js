import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  onChangeType = (event) => {
    // console.log("EVENT", event.target.value)
    this.setState({
      filters: {
        ...this.state.filters, 
        type: event.target.value 
      }
    })
  }

  onFindPetsClick = () => {
    let fetchVar = "/api/pets"
    if(this.state.filters.type !== "all"){
      fetchVar += `?type=${this.state.filters.type}`
    }
    fetch(fetchVar)
    .then(res => res.json())
    .then(res => this.setState({
      pets: res
    }))
    // .then(console.log(this.state.pets))
  }

  onAdopPet = (petId) => {
    let pets = this.state.pets.map((pet) => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet;
    })
    this.setState({
      pets: pets
    })

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdopPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
