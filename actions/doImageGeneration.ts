"use server";

import OpenAI from "openai";
import { getConvexClient } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { client } from "@/lib/schematic";

const IMAGE_SIZE = "1792x1024" as const;
const convexClient = getConvexClient();

export const doImageGeneration = async (prompt: string, videoId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthorised access. User not found.");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (!prompt) {
    throw new Error("No prompt provided, failed to generate image.");
  }

  console.log("Generating image with prompt: ", prompt);

  try {
    // Generate the image using DALL-E
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: IMAGE_SIZE,
      quality: "standard",
      style: "natural",
    });

    const imageUrl = imageResponse.data[0]?.url;
    if (!imageUrl) {
      throw new Error("No image url found.");
    }

    // Step 1: Get a short-lived upload URL for Convex
    console.log("--- Getting image upload URL ---");
    const postUrl = await convexClient.mutation(api.images.generateUploadUrl);
    console.log(`--- Successfuly retrieved upload URL: ${postUrl} ---`);

    // Step 2: Download the image from the URL
    console.log("--- Downloading the image from OpenAI ---");
    const image: Blob = await fetch(imageUrl).then((res) => res.blob());

    // Step 3: Upload the image to Convex storage bucket
    console.log("--- Uploading image to storage ---");
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": image!.type },
      body: image,
    });

    const { storageId } = await result.json();
    console.log(
      `--- Successfully uploaded image to storage with ID: ${storageId} ---`
    );

    // Step 4: Save the newly allocated storage id to the database
    console.log("--- Saving image reference to the database ---");
    await convexClient.mutation(api.images.storeImage, {
      storageId: storageId,
      videoId,
      userId: user.id,
    });
    console.log("--- Successfully saved image reference to the database ---");

    // get the serve image url
    const dbImageUrl = await convexClient.query(api.images.getImage, {
      videoId,
      userId: user.id,
    });

    // Track the image generation event on Schematic
    await client.track({
      event: featureFlagEvents[FeatureFlag.IMAGE_GENERATION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    return {
      imageUrl: dbImageUrl,
    };
  } catch (error) {
    console.error("Failed to generate an image: ", error);
  }
};
