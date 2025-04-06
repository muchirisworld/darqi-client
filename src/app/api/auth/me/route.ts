import { type NextRequest, NextResponse } from "next/server";
import "../../../../../envConfig";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_URL;

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    try {
        const response = await fetch(`${BACKEND_API_URL}/auth/me`, {
            credentials: 'include',
            headers: {
                authorization: `Bearer ${cookieStore.get('auth')?.value}` || '',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "Failed to fetch user" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json(null);
    }
}