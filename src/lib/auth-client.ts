
type SignInCredentials = {
    email: string
    password: string
}

type SignUpData = {
    firstName: string
    lastName: string
    email: string
    password: string
}

export async function signIn(credentials: SignInCredentials) {
    const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return response.json()
}

export async function signUp(userData: SignUpData) {
    const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    
    const data = await response.json()
    return data;
}
  