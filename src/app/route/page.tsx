import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const validEmail = "wml@wmltech.com";
	const validPassword = "Wml@1234";

	if (email === validEmail && password === validPassword) {
		return NextResponse.json({ message: "Login successful" }, { status: 200 });
	} else {
		return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
	}
}
