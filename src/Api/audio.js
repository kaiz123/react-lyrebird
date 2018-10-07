import axios from 'axios';


function generate(token, text) {
    return axios({
        method: 'post',
        url: `https://avatar.lyrebird.ai/api/v0/generate?`,
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        data: {
            text: text
        }
    })
}

function getGenerated(token,offset) {
    console.log("hello")
    return axios({
        method: 'get',
        url: `https://avatar.lyrebird.ai/api/v0/generated/`,
        headers: { 'Authorization': 'Bearer ' + token },
        params:{
            offset: offset,
            limit:10,
        }
    })
}


export {generate, getGenerated}
