import { auth } from "@clerk/nextjs/server";
import { users, sessions } from "@clerk/clerk-sdk-node"; // Use Clerk Node SDK for full API access
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("✅ API /api/refresh hit");

    const { userId, sessionId } = await auth();
    console.log("🆔 userId:", userId);
    console.log("🆔 sessionId:", sessionId);

    if (!userId || !sessionId) {
      console.warn("⚠️ Not authenticated");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("🔄 Calling updateUserMetadata...");
    const updated = await users.updateUserMetadata(userId, {
      publicMetadata: {}, // You can update this with any object
    });
    console.log("✅ Metadata updated:", updated);

    console.log("🔒 Revoking session...");
    const revoked = await sessions.revokeSession(sessionId);
    console.log("✅ Session revoked:", revoked);

    return NextResponse.json({ refreshed: true });

  } catch (err: any) {
    console.error("❌ Error in /api/refresh route:", err);
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
