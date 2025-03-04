import { Brain, ChartAreaIcon, ChartBarStacked, CircuitBoard, Image, MessageSquare, SparkleIcon, Sparkles, Video, VideoIcon } from "lucide-react";

export const APP_NAME = 'Creator CoPilot';

export const features = [
    {
        title: "AI-Powered Insights",
        description: "Get detailed insights about your video content with AI-powered analysis and transcription.",
        icon: CircuitBoard,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        title: "AI Analysis",
        description: "Get deep insights into your video content with our advanced AI analysis. Understand viewer management and content quality.",
        icon: ChartBarStacked,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        title: "Smart Transcription",
        description: "Get accurate transcriptions of your videos. Perfect for creating subtitles, blog posts, or repurposing content.",
        icon: MessageSquare,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        title: "Thumbnail Generator",
        description: "Get accurate transcriptions of your videos. Perfect for creating subtitles, blog posts, or repurposing content.",
        icon: Image,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        title: "Shot Script",
        description: "Get detailed step-by-step instructions to recreate viral videos. Learn shooting techniques, angles, and editing tips from successful content creators.",
        icon: Video,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        title: "Talk with your agent",
        description: "Talk with your agent to get personalized advice on your content. Get tips on how to improve your content and grow your audience.",
        icon: Sparkles,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
]

export const steps = [
{
    title: "1. Connect Your Content",
    description: "Share your YouTube video URL and let our agent get to work.",
    icon: VideoIcon,
},
{
    title: "2. Agent AI Analysis",
    description: "Your personal agent analyzes every aspect of your content.",
    icon: Brain,
},
{
    title: "3. Receive Insights",
    description: "Get actionable insights and strategic recommendations.",
    icon: ChartAreaIcon,
},
]
