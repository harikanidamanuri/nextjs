'use client';

import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Pencil, Trash2, ArrowUpDown, Search, Plus } from 'lucide-react';
import { getTags, addTag, editTag, deleteTag } from '../api';

type Tag = {
	id: number;
	name: string;
};

export default function TagsTable() {
	const [tags, setTags] = useState<Tag[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editText, setEditText] = useState('');
	const [showAddForm, setShowAddForm] = useState(false);
	const [newTagName, setNewTagName] = useState('');
	const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 25;
	const [totalItems, setTotalItems] = useState(0);
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const fetchTags = async () => {
		setLoading(true);
		setError(null);
		try {
			const result = await getTags(searchQuery, currentPage, itemsPerPage);
			setTags(result.tags || []);
			setTotalItems(result.total || 0);
		} catch (err) {
			console.error('❌ Failed to fetch tags:', err);
			setError('Failed to fetch tags');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTags();
	}, [searchQuery, currentPage]);

	const handleAddTag = async () => {
		const trimmed = newTagName.trim();
		if (!trimmed || tags.some(tag => tag.name === trimmed)) return;

		try {
			await addTag(trimmed);
			setNewTagName('');
			setShowAddForm(false);
			setCurrentPage(1);
			fetchTags();
		} catch (error) {
			console.error('Failed to add tag:', error);
		}
	};

	const handleSaveEdit = async () => {
		if (editingIndex === null || !editText.trim()) return;
		const tag = tags[editingIndex];
		try {
			await editTag(tag.id, editText.trim());
			setTags(prev =>
				prev.map(t => (t.id === tag.id ? { ...t, name: editText.trim() } : t))
			);
			setEditingIndex(null);
			setEditText('');
		} catch (err) {
			console.error('Edit tag error:', err);
		}
	};

	const confirmDelete = async (index: number) => {
		try {
			const tagToDelete = tags[index];
			await deleteTag(tagToDelete.id);
			setDeletingIndex(null);
			fetchTags();
		} catch (err) {
			console.error('Delete tag error:', err);
		}
	};

	return (
		<div className="min-h-screen bg-white p-6">
			<div className="space-y-4 p-4 bg-white w-full mx-auto shadow rounded-2xl">
				{/* Top Bar */}
				<div className="flex items-center justify-between flex-wrap gap-4">
					<h2 className="text-black font-semibold text-3xl">
						Tags ({totalItems})
					</h2>
					<div className="flex gap-2 flex-wrap items-center">
						<div className="flex items-center border rounded px-2 w-64 bg-white">
							<Search className="text-gray-600 mr-2" />
							<input
								type="text"
								placeholder="Search"
								className="py-2 w-full outline-none text-black bg-transparent"
								value={searchQuery}
								onChange={e => {
									setSearchQuery(e.target.value);
									setCurrentPage(1);
								}}
							/>
						</div>
						<button
							onClick={() => setShowAddForm(true)}
							className="px-3 py-2 rounded-xl flex items-center gap-1 bg-violet-500 text-white h-8"
						>
							<Plus /> Add Tag
						</button>
					</div>
				</div>

				{/* Tag List */}
				{tags.length === 0 ? (
					<div className="text-gray-500 text-center py-4">
						No tags found{searchQuery && ` for: "${searchQuery}"`}
					</div>
				) : (
					<>
						<div className="flex justify-between items-center font-medium text-sm bg-violet-100 rounded h-8">
							<div className="flex items-center text-gray-500">
								Name
								<ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
							</div>
							<span className="text-gray-500">Actions</span>
						</div>
						{tags.map((tag, index) => (
							<div
								key={tag.id}
								className="flex justify-between items-center border-b py-2 text-sm hover:bg-gray-100"
							>
								{editingIndex === index ? (
									<div className="flex gap-2 w-full">
										<input
											type="text"
											value={editText}
											onChange={e => setEditText(e.target.value)}
											className="border px-2 py-1 text-black rounded w-full"
										/>
										<button
											onClick={handleSaveEdit}
											className="bg-blue-600 text-white px-2 rounded hover:bg-violet-700"
										>
											Save
										</button>
									</div>
								) : (
									<span className="text-black">{tag.name}</span>
								)}
								<div className="flex gap-2 shrink-0 ml-4">
									<button
										onClick={() => {
											setEditingIndex(index);
											setEditText(tag.name);
										}}
										className="text-blue-600 hover:text-blue-800"
									>
										<Pencil className="h-4" />
									</button>
									<button
										onClick={() => setDeletingIndex(index)}
										className="text-red-600 hover:text-red-800"
									>
										<Trash2 className="h-4" />
									</button>
								</div>
							</div>
						))}

						{/* Next Page button inside the list */}
						{currentPage < totalPages && (
							<div className="flex justify-center py-4">
								<button
									onClick={() => setCurrentPage(currentPage + 1)}
									className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600"
								>
									Load Page {currentPage + 1}
								</button>
							</div>
						)}
					</>
				)}
			</div>

			{/* Pagination info at the bottom */}
			{totalItems > 0 && (
				<div className="flex justify-end mt-4 w-full">
					<div className="flex items-center gap-4">
						<div className="text-[18px] text-black">
							{(currentPage - 1) * itemsPerPage + 1} -{' '}
							{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
						</div>
						<div className="flex gap-2 flex-wrap">
							{Array.from({ length: totalPages }, (_, i) => {
								const page = i + 1;
								return (
									<button
										key={page}
										onClick={() => setCurrentPage(page)}
										className={`px-3 py-1 rounded ${currentPage === page
												? 'bg-violet-500 text-white'
												: 'text-black hover:bg-gray-100'
											}`}
									>
										{page}
									</button>
								);
							})}
						</div>
						<div className="flex gap-2 flex-wrap">
							{Array.from({ length: totalPages }, (_, i) => {
								const page = i + 2;
								return (
									<button
										key={page}
										onClick={() => setCurrentPage(page)}
										className={`px-3 py-1 rounded ${currentPage === page
											? 'bg-violet-500 text-white'
											: 'text-black hover:bg-gray-100'
											}`}
									>
										{page}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			)}

			{/* Add Modal */}
			{showAddForm && (
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<div className="border p-6 rounded bg-gray-50 w-[400px] relative shadow">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-black font-semibold text-lg">Add tag</h3>
							<button
								onClick={() => setShowAddForm(false)}
								className="text-gray-500 hover:text-red-600"
							>
								<FaTimes />
							</button>
						</div>
						<div className="mb-2">
							<label className="block text-black font-medium mb-1">
								Name <span className="text-red-600">*</span>
							</label>
							<input
								type="text"
								placeholder="Enter tag name"
								className="border px-3 py-2 rounded w-full text-black"
								value={newTagName}
								onChange={e => setNewTagName(e.target.value)}
							/>
						</div>
						<div className="flex justify-end gap-2 mt-4">
							<button
								onClick={() => {
									setNewTagName('');
									setShowAddForm(false);
								}}
								className="px-4 py-2 rounded border text-black hover:bg-gray-100"
							>
								Cancel
							</button>
							<button
								onClick={handleAddTag}
								disabled={!newTagName.trim()}
								className={`px-4 py-2 rounded text-white ${newTagName.trim()
										? 'bg-blue-600 hover:bg-blue-700'
										: 'bg-blue-400 cursor-not-allowed'
									}`}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Delete Modal */}
			{deletingIndex !== null && (
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<div className="border p-6 rounded bg-gray-50 w-[400px] relative shadow">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-black font-semibold text-lg">Delete Record</h3>
							<button
								onClick={() => setDeletingIndex(null)}
								className="text-gray-500 hover:text-red-600"
							>
								<FaTimes />
							</button>
						</div>
						<p className="text-black text-sm mb-4">
							Are you sure you want to delete this tag?
						</p>
						<div className="flex justify-end gap-2">
							<button
								onClick={() => setDeletingIndex(null)}
								className="px-4 py-2 rounded border text-black hover:bg-gray-100"
							>
								Cancel
							</button>
							<button
								onClick={() => confirmDelete(deletingIndex)}
								className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
