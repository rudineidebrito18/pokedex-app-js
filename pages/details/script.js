const idPokemon = location.search.slice().split('=')[1]
const urlApi = 'https://pokeapi.co/api/v2/pokemon/' + idPokemon

function createNode(el, className) {
    const result = document.createElement(el)
    if (className) {
        result.setAttribute('class', className)
    }
    return result
}

function append(parent, child){
    return parent.appendChild(child)
}

function attributeInfos(data) {
    const name = document.getElementById('infoName')
    const img = document.getElementById('infoImg')
    const experience = document.getElementById('infoExperience')
    const labelTypes = document.getElementById('labelTypes')
    const types = document.getElementById('infoTypes')
    const abilityList = document.getElementById('abilitiesList')
    
    name.innerHTML = data.name
    img.src = data.sprites.front_default
    experience.innerHTML = `EXP: ${data.base_experience}`
    if (data.types.length > 1) {
        labelTypes.innerHTML = 'Types:'
        types.innerHTML = `${data.types.map(e => ` ${e.type.name}`)}`
    } else {
        labelTypes.innerHTML = 'Type:'
        types.innerHTML = `${data.types[0].type.name}`
    }
    data.abilities.map(item => {
        const ability = createNode('li', 'infoAbility')
        ability.innerHTML = item.ability.name
        append(abilityList, ability)
    })

}

fetch(urlApi)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        attributeInfos(data)
    })
