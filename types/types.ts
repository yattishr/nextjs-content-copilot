export interface VideoDetails {
    title: string;
    views: string;
    likes: string;
    comments: string;
    thumbnail: string;
    channel: ChannelDetails;
    publishedAt: string;
}

export interface ChannelDetails {
    title: string;
    thumbnail: string;
    subscribers: string;
}

export interface TranscriptEntry {
    text: string;
    timestamp: string;
}