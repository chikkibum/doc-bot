"use client";

import { useCallback, useEffect, useState } from "react";

type Chat = {
	id: string;
	title: string;
	createdAt: string;
	userId: string;
	visibility?: string;
};

type GetChatsParams = {
	limit?: number;
	startingAfter?: string | null;
	endingBefore?: string | null;
};

type GetChatsResponse =
	| {
			chats: Chat[];
			hasMore: boolean;
	  }
	| Chat[];

export function useChat(userId: string | null) {
	const [chats, setChats] = useState<Chat[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchChats = useCallback(
		async (params?: GetChatsParams) => {
			if (!userId) {
				return;
			}

			try {
				setLoading(true);
				setError(null);

				const response = await fetch("/api/chats", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: userId,
						limit: params?.limit ?? 10,
						startingAfter: params?.startingAfter ?? null,
						endingBefore: params?.endingBefore ?? null,
					}),
				});

				const data: GetChatsResponse = await response.json();
				console.log(data);

				const chatList = Array.isArray(data) ? data : (data?.chats ?? []);

				setChats(chatList);
				setHasMore(Array.isArray(data) ? false : (data?.hasMore ?? false));
			} catch (err) {
				setError("Failed to fetch chats");
			} finally {
				setLoading(false);
			}
		},
		[userId]
	);

	const loadMore = async () => {
		if (!hasMore || chats.length === 0) {
			return;
		}

		const lastChat = chats[chats.length - 1];

		await fetchChats({
			startingAfter: lastChat.id,
			limit: 10,
		});
	};

	const refetch = () => {
		fetchChats();
	};

	useEffect(() => {
		if (userId) {
			fetchChats();
		}
	}, [userId, fetchChats]);

	return {
		chats,
		loading,
		error,
		hasMore,
		fetchChats,
		loadMore,
		refetch,
		setChats, // useful for optimistic updates
	};
}
