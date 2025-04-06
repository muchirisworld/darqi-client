import { type NextRequest, NextResponse } from "next/server";
import "../../../../../envConfig";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_URL;

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    try {
        const authToken = cookieStore.get('auth')?.value;

        const response = await fetch(`${BACKEND_API_URL}/auth/sign-out`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${authToken}` || '',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(
                { message: error.message || "Failed to sign out" },
                { status: response.status }
            );
        }

        // Create response and clear cookie
        const res = NextResponse.json({ message: "Successfully signed out" });
        res.cookies.delete('auth');
        
        return res;
    } catch (error) {
        console.error("Sign out error:", error);
        return NextResponse.json(
            { message: "Internal server error" }, 
            { status: 500 }
        );
    }
}