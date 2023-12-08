

export const request = async (url: string, method : string ) => {
    const host = 'https://dataviz-challenge-api.azurewebsites.net/api/'
    return fetch(host + url, { method: method, body: null})
}