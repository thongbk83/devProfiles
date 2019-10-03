import axios from "axios";

const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
});

if (localStorage.getItem("token")) {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
        "token"
    );
}

export default api;
