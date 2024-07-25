import React from "react";

interface UserProps {
	id: number;
	isOP: boolean;
}

const User: React.FC<UserProps> = ({ id, isOP }) => {
	return (
		<div className="flex text-xs items-center gap-1 leading-none">
			<h1 className="bg-accent text-white rounded-full px-2 py-1 flex items-center justify-center">
				Anonymous #{id}
			</h1>
			{isOP && <h1 className="text-[#00A3FF] font-bold">OP</h1>}
		</div>
	);
};

export default User;