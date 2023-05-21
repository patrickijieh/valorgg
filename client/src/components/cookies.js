function cookies(props){

    const setCookie = (name, value) => {
        const d = new Date();
        d.setTime(d.getTime() + (24*60*60*1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    const getCookie = (name) => {
        let cookieName = name + "=";
        let cookieArray = document.cookie.split(';');
        for(let i = 0; i < cookieArray.length; i++)
        {
            let cookie = cookieArray[i];
            while(cookie.charAt(0) === ' ')
            {
                cookie = cookie.substring(1);
            }
            if(cookie.indexOf(cookieName) === 0)
            {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }

    return false;
}

export default cookies;