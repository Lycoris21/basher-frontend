import { useQuery } from "@apollo/client";
import { Button } from "@components/button";
import TopicRow from "@features/forum/components/topic-row";
import TopicSkeleton from "@features/forum/components/topic-skeleton";
import { GET_TOPICS, GetTopicsQuery } from "@features/forum/utils/defs";
import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const ForumPage: React.FC = () => {
	const { loading, error, data } = useQuery<GetTopicsQuery>(GET_TOPICS, {
		variables: {
			offset: 0,
		},
	});

	useEffect(() => {
		if (!error) return;

		// TODO: Implement error handling
		console.error(error);
	});

	return (
		<div className="mx-auto flex h-full w-full flex-col gap-8 pb-8 md:max-w-3xl lg:max-w-7xl">
			{/*
			// TODO: Convert to a separate component
			*/}
			<div className="flex w-full justify-between gap-8 rounded-lg bg-white px-8 py-4 shadow-lg">
				<form className="flex flex-grow items-center gap-2">
					<Button variant="ghost" size="sm" className="group">
						<FaMagnifyingGlass className="text-gray-400 transition-colors group-hover:text-black" />
					</Button>
					<input placeholder="Search" className="flex-grow" />
				</form>
				<div className="flex gap-2">
					<Button variant="ghost" size="sm" className="font-normal">
						New
					</Button>
					<Button variant="ghost" size="sm" className="font-normal">
						Unread
					</Button>
					<Button variant="ghost" size="sm" className="font-normal">
						Top
					</Button>
					<Button size="sm" className="flex items-center gap-2 font-normal">
						<FaPlus />
						New Topic
					</Button>
				</div>
			</div>
			<div className="h-full w-full rounded-lg bg-white p-8 shadow-lg">
				<table className="w-full table-auto">
					<thead>
						<tr>
							<th className="w-full text-left">Topic</th>
							<th className="px-4 font-normal text-gray-500">Replies</th>
							<th className="px-4 font-normal text-gray-500">Likes</th>
							<th className="px-4 font-normal text-gray-500">Activity</th>
						</tr>
					</thead>
					{loading && <TopicSkeleton />}
					{!loading && data?.topic.get.map((topic) => <TopicRow key={topic.id} {...topic} />)}
				</table>
			</div>
		</div>
	);
};

export default ForumPage;
