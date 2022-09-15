
import createAuth0Client from "@auth0/auth0-spa-js";
import {user, isAuthenticated, popupOpen} from "./store";
import config from "../auth_config"; 



async function createClient() {
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId,
        scope: 'people:read',
        audience: 'fastapi-template'
        // cacheLocation: 'localstorage'
      });

      return auth0Client
}


async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
      await client.loginWithPopup();  //{scope: "people:read"}
      
      user.set(await client.getUser());
      console.log("Got user")
      isAuthenticated.set(true);
      const accessToken = await client.getTokenSilently();
      console.log("accessToken: " + accessToken)
    } catch (e) {
      // eslint-disable-next-line
      console.log("loginWithPopup Error")
      console.error(e);
    } finally {
        popupOpen.set(false);
    }
    
  }

  function logout(client) {
    return client.logout();
  }

const auth = {
    createClient,
    loginWithPopup,
    logout
}

export default auth;