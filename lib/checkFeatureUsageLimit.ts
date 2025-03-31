import { client } from "@/lib/schematic";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";

export async function checkFeatureUsageLimit(
    userId: string,
    eventSubType: string): Promise<{ success: boolean; error?: string}> {
        try {
            const entitlements = await client.entitlements.getFeatureUsageByCompany({
                keys: {
                    id: userId,
                }
            })

            const feature = entitlements.data.features.find(
                (entitlement) => entitlement.feature?.eventSubtype === eventSubType
            );

            if (!feature) {
                return {
                    success: false,
                    error: "This feature is not available on your current plan. Please upgrade to access this feature."
                }
            }

            const { usage, allocation } = feature;

            if (usage === undefined || allocation === undefined) {
                return {
                    success: false,
                    error: "System error: This feature is not defined. Please contact support."
                }
            }

            const hasExceededUsageLimit = usage >= allocation;

            if (hasExceededUsageLimit) {
                // Find the display-friendly feature name.
                const featureName = Object.entries(featureFlagEvents).find(
                    ([, value]) => value.event === eventSubType
                )?.[0] || eventSubType

                return {
                    success: false,
                    error: `You have exceeded your ${featureName} limit. Please upgrade your plan to continue using this feature.`
                };
            }

            return { success: true }
        } catch (error) {
            console.log("Error checking feature usage limit: ", error)
            return {
                success: false,
                error: "Error checking feature usage limit"
            }
        }
    }
    