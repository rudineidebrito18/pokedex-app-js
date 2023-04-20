const urlApi = 'https://pokeapi.co/api/v2/pokemon?limit=120$offset=0'
const ul = document.getElementById('cardsContainer')
const input = document.getElementById('searchInput')

function checkInputSearch(data) {
    const text = input.value
    ul.innerHTML = ''
    data.map(item => {
        if (item.name.startsWith(text)) {
            createCard(item)
        }
    })
}

function createNode(el, className) {
    const result = document.createElement(el)
    if (className) {
        result.setAttribute('class', className)
    }
    return result
}

function append(parent, el) {
    return parent.appendChild(el)
}

function createCard(data) {
    const li = createNode('li', 'itemContainer')
    const a = createNode('a')
    const img = createNode('img')
    const name = createNode('h3', 'name')
    const type = createNode('h5', 'type')
    const exp = createNode('h5', 'experience')

    a.setAttribute('href', `./pages/details/?id=${data.id}` )
    img.src = data.sprites.front_default
    name.innerHTML = data.name
    exp.innerHTML = `EXP: ${data.base_experience}`
    if (data.types.length > 1) {
        type.innerHTML = `Types:${data.types.map(e => {
            return ` ${e.type.name}`
        })}`
    } else {
        type.innerHTML = `Type: ${data.types[0].type.name}`
    }


    append(a, img)
    append(a, name)
    append(a, type)
    append(a, exp)
    append(li, a)
    append(ul, li)
}

fetch(urlApi)
    .then(resp => resp.json())
    .then(data => {
        const itemArray = [...data.results]

        Promise.all(itemArray.map(item => {
            return fetch(item.url).then(resp => resp.json())
        })).then(data => {
            data.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            data.map(item => createCard(item))
            input.addEventListener('keyup', () => checkInputSearch(data))
        })
    })