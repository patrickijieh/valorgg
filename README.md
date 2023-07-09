# valorgg
Valorant Match Tracking Web App.
Built using a MERN stack (MongoDB, Express, React, Node), and hosted by DigitalOcean. <br>

## Site Link
https://starfish-app-yrizy.ondigitalocean.app/

## Database
A user's username and saved Valorant accounts are stored in the database in plaintext. The user's password is stored as a hashed password with the help of a middleware function.

#### User information stored in Database
![image](https://github.com/patrickijieh/valorgg/assets/123503029/da788191-1281-470c-b3c3-2dbea851986f)<br><br>

#### Hashing function
```js
const bcrypt = require('bcrypt');

async function hashPassword(pword) {
    const hash = await bcrypt.hash(pword, 10);
    return hash;
}
```

## Credits
Made by Patrick Ijieh (May 2023).
