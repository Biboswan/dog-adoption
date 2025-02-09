export const checkIfLogged = () => {
    if (typeof window === "undefined") return false; // Prevent issues on SSR
    const now = new Date();
    const expiryTime = localStorage.getItem('expiryTime');
    return expiryTime && (now<new Date(expiryTime));
  };
  