'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, LayoutDashboard, Users, MessageCircle, Grid, Clipboard, Calendar,  Settings, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

const DashboardLayout = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(true);

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<div className="w-64 bg-white border-r p-8">
				<div className="text-black">
					<ul className="mb-4">
						<li className="mb-4 flex items-center gap-2">
							<LayoutDashboard size={20} />
							Dashboard
						</li>
						<li className="mb-4 flex items-center gap-2">
							<Users size={20} />
							Staff
						</li>
						<li className="mb-4 flex items-center gap-2">
							<MessageCircle size={20} />
							Conversations
						</li>
						<li className="mb-4 flex items-center gap-2">
							<Grid size={20} />
							Workflows
						</li>
						<li className="mb-4 flex items-center gap-2">
							<SettingsIcon size={20} />
							Quiz
						</li>
						<li className="mb-4 flex items-center gap-2">
							<Clipboard size={20} />
							Contents
						</li>
					</ul>
				</div>

				{/* Settings Dropdown */}
				<div className="mt-10">
					<button
						onClick={() => setIsSettingsOpen(!isSettingsOpen)}
						className="flex items-center justify-between w-full text-left text-white bg-indigo-500 px-4 py-2 rounded hover:bg-white hover:text-black"
					>
						<span className="flex items-center gap-2">
							<Settings size={16} />
							Settings
						</span>
						{isSettingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
					</button>

					{isSettingsOpen && (
						<div className="ml-4 mt-2 space-y-2 text-gray-800">
							<div className="cursor-pointer flex items-center gap-2">
								<Settings size={16} />
								Settings
							</div>
							<div className="cursor-pointer flex items-center gap-2">
								<Users size={16} />
								Roles
							</div>
							<div className="cursor-pointer flex items-center gap-2">
								<Calendar size={16} />
								Languages
							</div>
							<div className="cursor-pointer flex items-center gap-2">
								<Users size={16} />
								Users
							</div>
							<Link href='/tags'>
								<div className="cursor-pointer flex items-center gap-2">
									<Clipboard size={16} />
									Tags
								</div>
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
