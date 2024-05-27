async function handleLogin(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username: formData.get("email"),
                password: formData.get("password")
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            throw new Error("Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        alert("Login successful!");
        fetchItems();
        window.location.href = "/pages/profile";
    } catch (error) {
        console.error("Error:", error);
        alert("Login failed");
    }
}

async function fetchItems() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No token found, please log in first.");
        return;
    }

    try {
        const response = await fetch("/pages/profile/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Error fetching items:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
