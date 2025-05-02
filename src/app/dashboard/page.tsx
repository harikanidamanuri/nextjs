'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const DashboardLayout = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(true);

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<div className="w-64 bg-white border-r p-8">
				<div className="text-black">
					<ul className="mb-4">
						<li className="mb-4">Dashboard</li>
						<li className="mb-4">Staff</li>
						<li className="mb-4">Staff Groups</li>
						<li className="mb-4">Conversations</li>
						<li className="mb-4">Templates</li>
						<li className="mb-4">Broadcast</li>
						<li className="mb-4">Workflows</li>
						<li className="mb-4">Quiz</li>
						<li className="mb-4">Contents</li>
					</ul>
				</div>

				{/* Settings Dropdown */}
				<div className="mt-10">
					<button
						onClick={() => setIsSettingsOpen(!isSettingsOpen)}
						className="flex items-center justify-between w-full text-left text-white bg-indigo-500 px-4 py-2 rounded hover:bg-white hover:text-black"
					>
						<span className="flex items-center gap-2">Settings</span>
						{isSettingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
					</button>

					{isSettingsOpen && (
						<div className="ml-4 mt-2 space-y-2 text-gray-800">
							<div className="cursor-pointer">Settings</div>
							<div className="cursor-pointer">Roles</div>
							<div className="cursor-pointer">Languages</div>
							<div className="cursor-pointer">Users</div>
							<Link href='/tags'>
								<div className="cursor-pointer">Tags</div>
							</Link>
						</div>
					)}
				</div>
			</div>

			{/* Main Content Area */}
			<div className="flex-1 p-8 bg-gray-100 overflow-y-auto text-black">
				<h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white p-6 rounded shadow">📊 Analytics</div>
					<div className="bg-white p-6 rounded shadow">💬 Messages</div>
					<div className="bg-white p-6 rounded shadow">🧑 Staff Activity</div>
					<div className="bg-white p-6 rounded shadow">📝 Tasks</div>
					<div className="bg-white p-6 rounded shadow">📅 Calendar</div>
					<div className="bg-white p-6 rounded shadow">🔔 Notifications</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
