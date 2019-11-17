import { APP_URL } from '../commons/ApiLinks';

function getAppsForUser(){
    
    var applist = fetch(APP_URL, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => response.json())
        .then(response => {
            return response;
        });

    return applist;
}



export {
    getAppsForUser
}