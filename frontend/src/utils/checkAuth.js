export const checkAuth = async () => {
    try {
        const res = await fetch("/api/auth/me", {
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error('Authentication failed');
        }

        const data = await res.json();
        
        if (data.user) {
            localStorage.setItem("placementUser", JSON.stringify(data.user));
            return data.user;
        }
        return null;
    } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("placementUser");
        return null;
    }
}