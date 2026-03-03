import { useState } from 'react';

export default function AddWalletModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    network: 'ethereum'
  });

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(formData.address, formData.name, formData.network);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input"
              placeholder="0x..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Wallet Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="My Wallet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Network
            </label>
            <select
              name="network"
              value={formData.network}
              onChange={handleChange}
              className="input"
            >
              <option value="ethereum">Ethereum</option>
              <option value="base">Base</option>
              <option value="polygon">Polygon</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Add Wallet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
