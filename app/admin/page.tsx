'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI, uploadImage, type Portfolio } from '@/lib/supabase';

export default function AdminPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    setLoading(true);
    try {
      const result = await portfolioAPI.getAll({ page: 1, limit: 100 });
      setPortfolios(result.data);
    } catch (error) {
      console.error(error);
      alert('Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      await portfolioAPI.delete(id);
      setPortfolios(portfolios.filter(p => p.id !== id));
      alert('Portfolio deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete portfolio');
    }
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPortfolio(null);
    loadPortfolios();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-dark mb-2">Portfolio Admin</h1>
              <p className="text-gray-600">Manage your 200+ project portfolio</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-bold shadow-lg"
            >
              ➕ Add New Portfolio
            </motion.button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-3xl font-bold text-primary">{portfolios.length}</div>
            <div className="text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-secondary">
              {portfolios.filter(p => p.featured).length}
            </div>
            <div className="text-gray-600">Featured</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-2">👁️</div>
            <div className="text-3xl font-bold text-accent">
              {portfolios.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-2">📅</div>
            <div className="text-3xl font-bold text-purple-600">
              {new Date().getFullYear()}
            </div>
            <div className="text-gray-600">This Year</div>
          </div>
        </div>

        {/* Portfolio List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">All Portfolios</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {portfolios.map((portfolio) => (
                    <tr key={portfolio.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={portfolio.thumbnail_url || portfolio.image_url}
                          alt={portfolio.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{portfolio.title}</div>
                        {portfolio.featured && (
                          <span className="text-xs bg-secondary text-white px-2 py-1 rounded">⭐ Featured</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{portfolio.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{portfolio.client_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(portfolio.event_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{portfolio.views}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(portfolio)}
                            className="text-primary hover:text-blue-700 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(portfolio.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <PortfolioForm
          portfolio={editingPortfolio}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

// Portfolio Form Component
function PortfolioForm({ portfolio, onClose }: { portfolio: Portfolio | null; onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Portfolio>>(
    portfolio || {
      title: '',
      description: '',
      category: 'conference',
      client_name: '',
      event_date: new Date().toISOString().split('T')[0],
      location: 'Seoul, Korea',
      image_url: '',
      tags: [],
      featured: false
    }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData({ ...formData, image_url: url, thumbnail_url: url });
    } catch (error) {
      console.error(error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (portfolio) {
        await portfolioAPI.update(portfolio.id, formData);
        alert('Portfolio updated successfully!');
      } else {
        await portfolioAPI.create(formData);
        alert('Portfolio created successfully!');
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to save portfolio');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl max-w-2xl w-full p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {portfolio ? 'Edit Portfolio' : 'Add New Portfolio'}
          </h2>
          <button onClick={onClose} className="text-2xl hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            {formData.image_url && (
              <img src={formData.image_url} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-lg" />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Category & Client */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="conference">Conference</option>
                <option value="concert">Concert</option>
                <option value="corporate">Corporate Event</option>
                <option value="exhibition">Exhibition</option>
                <option value="musical">Musical</option>
                <option value="festival">Festival</option>
                <option value="vip">VIP Protocol</option>
                <option value="3d-viz">3D Visualization</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Client Name</label>
              <input
                type="text"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Date</label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5"
            />
            <label htmlFor="featured" className="font-medium">⭐ Featured Portfolio</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-bold disabled:opacity-50"
            >
              {saving ? 'Saving...' : portfolio ? 'Update Portfolio' : 'Create Portfolio'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
