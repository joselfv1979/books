export const getHeaders = () => {

    const storedToken = localStorage.getItem("token");

    const token = storedToken ? JSON.parse(storedToken) : null;

    return {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
    };
};
