export default (searchType, version, value) => {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/${searchType}.php?${version}=${value}`)
        .then(res => res.json());
}