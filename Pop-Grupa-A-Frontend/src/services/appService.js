import { APP_URL } from '../commons/ApiLinks';

function getAppsForUser(){
    
    var applist = fetch(APP_URL, {
        crossDomain: true,
        method: 'get',
    })
        .then(response => {
            return response.status === 200 ? response.json() : [];
        });

    return applist;
}



export {
    getAppsForUser
}