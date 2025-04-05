export function getCookie(name_) {
    const nameEQ = name_ + "=";
    const cookies = document.cookie.split(';'); // separating the single string containing all the cookies
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while(cookie.charAt(0) === ' ') { // as long as the first character is a space
            cookie = cookie.substring(1, cookie.length); // removes the leading whitespace in the cookie
        }
        if(cookie.indexOf(nameEQ) === 0) { // checks if the current cookie starts with the name of the searched cookie
            return cookie.substring(nameEQ.length, cookie.length); // extracts and returns the cookie value
        }
        return null;
    }
}
export function deleteCookie(name_) { // constructs the cookie string with the necessary attributes and sets its expiration date to a past date, effectively deleting it
    if (getCookie(name_)) {
        document.cookie = name_ + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}
export function setCookie(name_, value_) {
    document.cookie = name_ + "=" + (encodeURIComponent(value_) || "") + "; path=/";
    /* "encodeURIComponent()" encodes the cookie value to ensure that special characters
    (such as semicolons, commas, or spaces) do not cause issues when storing or retrieving the cookie.
    This is important because certain characters can interfere with the cookie parsing process.

    "(encodeURIComponent(value_) || "")" ensures that if "value_" is empty or undefined,
    the cookie value defaults to an empty string.

    "; path=/" specifies the path for which the cookie is valid. Setting it to '/' makes
    the cookie accessible across the entire domain. Without specifying the path,
    the cookie would only beaccessible to the page that set it. */
}