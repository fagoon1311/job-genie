"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { is } from "zod/v4/locales";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { generateDashboardData } from "./dashboard";
import next from "next";

// Define a type for the expected shape of the incoming data
interface UpdateUserInput {
  industry: string;
  experience: number;
  bio: string;
  skills: string[];
}

// Define a type for the return structure
interface UpdateUserResult {
  success: true;
  updatedUser: {
    id: string;
    industry: string | null;
    experience: number | null;
    bio: string | null;
    skills: string[];
  };
  industryInsight: {
    id: string;
    industry: string;
    // Add other fields if needed
  };
}

export async function updateUser(
  data: UpdateUserInput
): Promise<UpdateUserResult> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");
  console.log('User found:', user);
  console.log('------------------------')
  console.log('Trying to generate insights for industry:', user.industry);

  try {
    const result = await db.$transaction(
      async (tx) => {
        let industryInsight = await tx.industryInsight.findUnique({
          where: { industry: data.industry },
        });

        if (!industryInsight) {
          console.log('Generating new insights for industry:', data.industry);
          console.log("Generating insights for industry:", typeof(data.industry));
          const insights = await generateDashboardData(data.industry);
          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            },
          });
        }

        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000,
      }
    );

    await clerkClient.users.updateUserMetadata(user.clerkUserId, {
      publicMetadata: {
        onboarded: true,
      },
    });

    // ✅ Return with success flag
    return {
      success: true,
      updatedUser: {
        id: result.updatedUser.id,
        industry: result.updatedUser.industry,
        experience: result.updatedUser.experience,
        bio: result.updatedUser.bio,
        skills: result.updatedUser.skills,
      },
      industryInsight: {
        id: result.industryInsight.id,
        industry: result.industryInsight.industry,
      },
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,
      },
    });

    return { isOnboarded: !!user?.industry };
  } catch (error) {
    console.error("Error fetching user onboarding status:", error);
    throw new Error("Failed to fetch onboarding status");
  }
}
