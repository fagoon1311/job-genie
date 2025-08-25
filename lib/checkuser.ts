import { currentUser } from "@clerk/nextjs/server";
import {db} from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();
    // console.log("Checking user:", user);
    if (!user){
        return null
    }

    try {
        const loggedInUser = await db.user.findUnique({
            where:{
                clerkUserId: user.id
            }
        })

        if (loggedInUser) return loggedInUser;

        const name = `${user.firstName} ${user.lastName}`.trim();
        const newUser = await db.user.create({
            data:{
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl || undefined,
                email: user.emailAddresses[0]?.emailAddress,
            }
        })
        console.log("New user created:", newUser);
        return newUser;
    } catch (error: string | any) {
        console.error("Error checking user:", error.message);
    }
}