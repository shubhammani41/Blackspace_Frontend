export enum PostVisibility {
    'PUBLIC', 'PRIVATE', 'FRIENDS'
}
export enum MediaType {
    IMAGE = 'IMAGE', VIDEO = 'VIDEO', GIF = 'GIF'
}
export enum Reaction {
    'LIKE', 'DISLIKE', 'NONE'
}

export interface Post {
    postId: number;
    userId: number;
    postCaption: string;
    visibility: PostVisibility;
    createdDate: Date;
}

export interface PostContent {
    postId: number;
    contentId: number;
    mediaLink: string;
    mediaType: MediaType;
    mediaDuration: number;
    thumbnailLink: string;
    createdDate: Date;
}

export interface PostView {
    viewId: number;
    postId: number;
    userId: number;
    reaction: Reaction;
    viewedAt: Date;
}

export interface PostHashtag {
    postId: number;
    hashtagId: number;
    hashtag: string;
}

export interface PostDetails extends Post {
    postContents: PostContent[];
    postViews: PostView[];
    postHashtags: PostHashtag[];
}

export const mockPosts: PostDetails[] = [
    {
        postId: 1,
        userId: 101,
        postCaption: "Enjoying a peaceful sunset 🌅",
        visibility: PostVisibility.PUBLIC,
        createdDate: new Date("2024-09-01T18:30:00"),

        postContents: [
            {
                postId: 1,
                contentId: 11,
                mediaLink: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
                mediaType: MediaType.IMAGE,
                mediaDuration: 0,
                thumbnailLink: "",
                createdDate: new Date("2024-09-01T18:30:00"),
            },
        ],

        postViews: [
            {
                viewId: 1,
                postId: 1,
                userId: 102,
                reaction: Reaction.LIKE,
                viewedAt: new Date("2024-09-01T19:00:00"),
            },
            {
                viewId: 2,
                postId: 1,
                userId: 103,
                reaction: Reaction.NONE,
                viewedAt: new Date("2024-09-01T19:05:00"),
            },
        ],

        postHashtags: [
            { postId: 1, hashtagId: 201, hashtag: "sunset" },
            { postId: 1, hashtagId: 202, hashtag: "peace" },
        ],
    },
    {
        postId: 2,
        userId: 102,
        postCaption: "Beach vibes all day! 🌴",
        visibility: PostVisibility.FRIENDS,
        createdDate: new Date("2024-09-03T14:00:00"),

        postContents: [
            {
                postId: 2,
                contentId: 21,
                mediaLink: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
                mediaType: MediaType.IMAGE,
                mediaDuration: 0,
                thumbnailLink: "",
                createdDate: new Date("2024-09-03T14:00:00"),
            },
            {
                postId: 2,
                contentId: 22,
                mediaLink: "https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg",
                mediaType: MediaType.IMAGE,
                mediaDuration: 0,
                thumbnailLink: "",
                createdDate: new Date("2024-09-03T14:02:00"),
            },
        ],

        postViews: [
            {
                viewId: 3,
                postId: 2,
                userId: 101,
                reaction: Reaction.LIKE,
                viewedAt: new Date("2024-09-03T15:00:00"),
            },
        ],

        postHashtags: [
            { postId: 2, hashtagId: 203, hashtag: "beach" },
            { postId: 2, hashtagId: 204, hashtag: "vacation" },
        ],
    },
    {
        postId: 3,
        userId: 103,
        postCaption: "Check out this short cinematic 🌌",
        visibility: PostVisibility.PRIVATE,
        createdDate: new Date("2024-09-05T21:30:00"),

        postContents: [
            {
                postId: 3,
                contentId: 31,
                mediaLink: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                mediaType: MediaType.VIDEO,
                mediaDuration: 12,
                thumbnailLink: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
                createdDate: new Date("2024-09-05T21:30:00"),
            },
        ],

        postViews: [
            {
                viewId: 4,
                postId: 3,
                userId: 102,
                reaction: Reaction.DISLIKE,
                viewedAt: new Date("2024-09-05T22:00:00"),
            },
        ],

        postHashtags: [
            { postId: 3, hashtagId: 205, hashtag: "cinematic" },
            { postId: 3, hashtagId: 206, hashtag: "video" },
        ],
    },
    {
        postId: 3,
        userId: 103,
        postCaption: "Check out this short cinematic 🌌",
        visibility: PostVisibility.PRIVATE,
        createdDate: new Date("2024-09-05T21:30:00"),

        postContents: [
            {
                postId: 3,
                contentId: 31,
                mediaLink: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                mediaType: MediaType.VIDEO,
                mediaDuration: 12,
                thumbnailLink: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
                createdDate: new Date("2024-09-05T21:30:00"),
            },
        ],

        postViews: [
            {
                viewId: 4,
                postId: 3,
                userId: 102,
                reaction: Reaction.DISLIKE,
                viewedAt: new Date("2024-09-05T22:00:00"),
            },
        ],

        postHashtags: [
            { postId: 3, hashtagId: 205, hashtag: "cinematic" },
            { postId: 3, hashtagId: 206, hashtag: "video" },
        ],
    },
    {
        postId: 3,
        userId: 103,
        postCaption: "Check out this short cinematic 🌌",
        visibility: PostVisibility.PRIVATE,
        createdDate: new Date("2024-09-05T21:30:00"),

        postContents: [
            {
                postId: 3,
                contentId: 31,
                mediaLink: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                mediaType: MediaType.VIDEO,
                mediaDuration: 12,
                thumbnailLink: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
                createdDate: new Date("2024-09-05T21:30:00"),
            },
        ],

        postViews: [
            {
                viewId: 4,
                postId: 3,
                userId: 102,
                reaction: Reaction.DISLIKE,
                viewedAt: new Date("2024-09-05T22:00:00"),
            },
        ],

        postHashtags: [
            { postId: 3, hashtagId: 205, hashtag: "cinematic" },
            { postId: 3, hashtagId: 206, hashtag: "video" },
        ],
    },
    {
        postId: 3,
        userId: 103,
        postCaption: "Check out this short cinematic 🌌",
        visibility: PostVisibility.PRIVATE,
        createdDate: new Date("2024-09-05T21:30:00"),

        postContents: [
            {
                postId: 3,
                contentId: 31,
                mediaLink: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                mediaType: MediaType.VIDEO,
                mediaDuration: 12,
                thumbnailLink: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
                createdDate: new Date("2024-09-05T21:30:00"),
            },
        ],

        postViews: [
            {
                viewId: 4,
                postId: 3,
                userId: 102,
                reaction: Reaction.DISLIKE,
                viewedAt: new Date("2024-09-05T22:00:00"),
            },
        ],

        postHashtags: [
            { postId: 3, hashtagId: 205, hashtag: "cinematic" },
            { postId: 3, hashtagId: 206, hashtag: "video" },
        ],
    },
];

export interface PostListReponse {
    data: PostDetails[],
    pageSize: number
    totalElements: number
    totalPages: number
}
