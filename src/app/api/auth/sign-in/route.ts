import { type NextRequest, NextResponse } from "next/server";
import "../../../../../envConfig";

const BACKEND_API_URL = process.env.BACKEND_URL;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Forward the request to your backend
        const response = await fetch(`${BACKEND_API_URL}/auth/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        
        // Get the response data
        const data = await response.json();
        
        // If the backend response wasn't successful, forward the error
        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "Registration failed" },
                { status: response.status }
            );
        }

        // Return the successful response from your backend
        return NextResponse.json(data);
    } catch (error) {
        console.error("Sign in error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
