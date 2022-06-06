export function fetchPopularRepos (language){
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        // fetch returns us a promise
        //return the response from the request into json
        .then((res) => res.json())
        .then((data) => {
            //if data doesn't come through (rate limits or something)
            if(!data.items){
                throw new Error(data.message)
            }
            return data.items;
        })
}