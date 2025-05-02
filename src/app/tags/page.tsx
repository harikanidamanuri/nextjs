'use client';

import { FC, useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const TagsTable: FC = () => {
	const [tags, setTags] = useState<string[]>([]);
	const [search, setSearch] = useState('');
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [newTag, setNewTag] = useState('');
	const [editText, setEditText] = useState('');

	// Dummy initial data
	useEffect(() => {
		setTags(['example', 'tag', 'demo']);
	}, []);

	const handleAddTag = () => {
		if (newTag.trim()) {
			setTags([...tags, newTag.trim()]);
			setNewTag('');
		}
	};

	const handleDelete = (index: number) => {
		const updated = tags.filter((_, i) => i !== index);
		setTags(updated);
	};

	const handleSaveEdit = () => {
		if (editingIndex !== null && editText.trim()) {
			const updated = [...tags];
			updated[editingIndex] = editText.trim();
			setTags(updated);
			setEditingIndex(null);
			setEditText('');
		}
	};

	const filteredTags = tags.filter(tag =>
		tag.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-white p-6">
			<div className="space-y-4 p-4 bg-white w-full mx-auto shadow rounded">
				{/* Top Bar */}
				<div className="flex items-center justify-between">
					<h2 className="text-black font-semibold">Tags ({filteredTags.length})</h2>
					<div className="flex gap-2">
						<input
							type="text"
							placeholder="Search..."
							className="border px-3 py-1 rounded text-black"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<input
							type="text"
							placeholder="New Tag"
							className="border px-3 py-1 rounded text-black"
							value={newTag}
							onChange={(e) => setNewTag(e.target.value)}
						/>
						<button
							onClick={handleAddTag}
							disabled={!newTag.trim()}
							className={`px-3 py-1 rounded flex items-center gap-1
								${newTag.trim()
									? 'bg-blue-600 text-white hover:bg-blue-700'
									: 'bg-blue-500 text-gray-300 cursor-not-allowed'}
							`}
						>
							<FaPlus /> Add
						</button>
					</div>
				</div>

				{/* Table Header */}
				<div className="flex justify-between items-center border-b pb-2 font-medium text-sm bg-violet-100">
					<div className="flex items-center gap-1">
						<span className="text-black">Name</span>
						<FaArrowUp className="text-gray-500 cursor-pointer" />
						<FaArrowDown className="text-gray-500 cursor-pointer" />
					</div>
					<span className="text-black">Actions</span>
				</div>

				{/* Tags List */}
				{filteredTags.map((tag, index) => (
					<div key={index} className="flex flex-col items-end">
						<div className="flex gap-2 mb-1">
							<button
								onClick={() => {
									setEditingIndex(index);
									setEditText(tag);
								}}
								className="text-blue-600 hover:text-blue-800"
							>
								<FaEdit />
							</button>
							<button
								onClick={() => handleDelete(index)}
								className="text-red-600 hover:text-red-800"
							>
								<FaTrash />
							</button>
						</div>
						<div className="w-full flex justify-between items-center">
							{editingIndex === index ? (
								<div className="flex gap-2 w-full">
									<input
										type="text"
										value={editText}
										onChange={(e) => setEditText(e.target.value)}
										className="border px-2 py-1 text-black rounded w-full"
									/>
									<button
										onClick={handleSaveEdit}
										className="bg-blue-600 text-white px-2 rounded hover:bg-blue-700"
									>
										Save
									</button>
								</div>
							) : (
								<span className="text-black">{tag}</span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TagsTable;
