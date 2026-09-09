import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/components/Dashboard.scss';

const Dashboard = ({ isLoggedIn, handleLogout }) => {
  const [activeTab, setActiveTab] = useState('cleanings');

  const [cleanings, setCleanings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [services, setServices] = useState({
    deep: {
      bedroomCost: 75,
      bathroomCost: 85,
      ovenAddon: 100,
      windowAddon: 75,
      fridgeAddon: 100,
    },
    moveInOut: {
      bedroomCost: 100,
      bathroomCost: 100,
      ovenAddon: 75,
      windowAddon: 50,
      fridgeAddon: 50,
    },
    standard: {
      bedroomCost: 55,
      bathroomCost: 65,
      ovenAddon: 20,
      windowAddon: 20,
      fridgeAddon: 20,
    },
    discounts: {
      oneTime: 0,
      weekly: 25,
      biWeekly: 0,
      monthly: 0,
    },
  });

  // Modal / Form States
  const [showCleanerModal, setShowCleanerModal] = useState(false);
  const [newCleaner, setNewCleaner] = useState({ name: '', email: '', phone: '' });

  // Fetch initial data from your MongoDB API endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [cleaningsRes, cleanersRes, servicesRes] = await Promise.allSettled([
          axios.get('http://localhost:5000/api/cleanings', config),
          axios.get('http://localhost:5000/api/cleaners', config),
          axios.get('http://localhost:5000/api/services', config),
        ]);

        if (cleaningsRes.status === 'fulfilled') setCleanings(cleaningsRes.value.data);
        if (cleanersRes.status === 'fulfilled') setCleaners(cleanersRes.value.data);
        if (servicesRes.status === 'fulfilled' && servicesRes.value.data) {
          setServices(servicesRes.value.data);
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  // Handler for Cleaner Assignment Multi-select
  const handleAssignCleaner = async (cleaningId, cleanerName) => {
    const updated = cleanings.map((item) => {
      if (item._id === cleaningId || item.id === cleaningId) {
        const currentCleaners = item.cleaners || [];
        if (!currentCleaners.includes(cleanerName)) {
          return { ...item, cleaners: [...currentCleaners, cleanerName] };
        }
      }
      return item;
    });
    setCleanings(updated);
  };

  const handleRemoveCleaner = (cleaningId, cleanerName) => {
    const updated = cleanings.map((item) => {
      if (item._id === cleaningId || item.id === cleaningId) {
        return {
          ...item,
          cleaners: (item.cleaners || []).filter((c) => c !== cleanerName),
        };
      }
      return item;
    });
    setCleanings(updated);
  };

  // Add Cleaner Handler
  const handleAddCleanerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/cleaners', newCleaner);
      setCleaners([...cleaners, res.data]);
      setNewCleaner({ name: '', email: '', phone: '' });
      setShowCleanerModal(false);
    } catch (err) {
      console.error('Error adding cleaner:', err);
    }
  };

  // Service pricing input handler
  const handleServiceChange = (category, field, value) => {
    setServices((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  return (
    <div className="dashboard-page">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main className="dashboard-container">
        {/* Top Tab Navigation */}
        <div className="dashboard-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'cleanings' ? 'active' : ''}`}
            onClick={() => setActiveTab('cleanings')}
          >
            Cleanings
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'cleaners' ? 'active' : ''}`}
            onClick={() => setActiveTab('cleaners')}
          >
            Cleaners
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
        </div>

        {/* TAB 1: CLEANINGS TABLE */}
        {activeTab === 'cleanings' && (
          <div className="tab-card">
            <div className="card-header-bar">Cleanings</div>
            <div className="card-body">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cleaning Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Cleaner</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cleanings.map((row, index) => (
                    <tr key={row._id || index}>
                      <td>{index + 1}</td>
                      <td>{row.type || 'standard'}</td>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                      <td>
                        <div className="cleaner-select-wrapper">
                          <div className="tags-container">
                            {(row.cleaners || []).map((c) => (
                              <span key={c} className="cleaner-tag">
                                {c}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCleaner(row._id || row.id, c)}
                                >
                                  &times;
                                </button>
                              </span>
                            ))}
                            <select
                              value=""
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleAssignCleaner(row._id || row.id, e.target.value);
                                }
                              }}
                            >
                              <option value="">Select...</option>
                              {cleaners.map((cl) => (
                                <option key={cl._id || cl.id} value={cl.name}>
                                  {cl.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon btn-view" title="View details">
                            👁
                          </button>
                          <button className="btn-icon btn-delete" title="Delete">
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CLEANERS TABLE */}
        {activeTab === 'cleaners' && (
          <div className="tab-card">
            <div className="card-header-bar flex-between">
              <span>Cleaners</span>
              <button className="btn-primary" onClick={() => setShowCleanerModal(true)}>
                Add Cleaner
              </button>
            </div>
            <div className="card-body">
              <table className="dash-table cleaners-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cleaners.map((c, index) => (
                    <tr key={c._id || index}>
                      <td>{index + 1}</td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-edit">Edit</button>
                          <button className="btn-delete-solid">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES PRICING */}
        {activeTab === 'services' && (
          <div className="tab-card">
            <div className="card-header-bar">Service Pricing</div>
            <div className="card-body space-y">
              {/* DEEP */}
              <div className="pricing-section">
                <div className="section-title">DEEP</div>
                <div className="form-grid">
                  <div className="input-field">
                    <label>Cost Per Bedroom</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.deep.bedroomCost}
                        onChange={(e) => handleServiceChange('deep', 'bedroomCost', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Cost Per Bathroom</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.deep.bathroomCost}
                        onChange={(e) => handleServiceChange('deep', 'bathroomCost', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Addon - Oven Cleaning</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.deep.ovenAddon}
                        onChange={(e) => handleServiceChange('deep', 'ovenAddon', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Addon - Window Cleaning</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.deep.windowAddon}
                        onChange={(e) => handleServiceChange('deep', 'windowAddon', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Addon - Fridge Cleaning</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.deep.fridgeAddon}
                        onChange={(e) => handleServiceChange('deep', 'fridgeAddon', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* MOVE IN OUT */}
              <div className="pricing-section">
                <div className="section-title">MOVE IN OUT</div>
                <div className="form-grid">
                  <div className="input-field">
                    <label>Cost Per Bedroom</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.moveInOut.bedroomCost}
                        onChange={(e) => handleServiceChange('moveInOut', 'bedroomCost', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Cost Per Bathroom</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.moveInOut.bathroomCost}
                        onChange={(e) => handleServiceChange('moveInOut', 'bathroomCost', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Addon - Oven Cleaning</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.moveInOut.ovenAddon}
                        onChange={(e) => handleServiceChange('moveInOut', 'ovenAddon', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Addon - Window Cleaning</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.moveInOut.windowAddon}
                        onChange={(e) => handleServiceChange('moveInOut', 'windowAddon', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Addon - Fridge Cleaning</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.moveInOut.fridgeAddon}
                        onChange={(e) => handleServiceChange('moveInOut', 'fridgeAddon', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* STANDARD */}
              <div className="pricing-section">
                <div className="section-title">STANDARD</div>
                <div className="form-grid">
                  <div className="input-field">
                    <label>Cost Per Bedroom</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.standard.bedroomCost}
                        onChange={(e) => handleServiceChange('standard', 'bedroomCost', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Cost Per Bathroom</label>
                    <div className="input-addon">
                      <span className="badge-prefix">$</span>
                      <input
                        type="number"
                        value={services.standard.bathroomCost}
                        onChange={(e) => handleServiceChange('standard', 'bathroomCost', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* DISCOUNTS */}
              <div className="pricing-section">
                <div className="section-title">DISCOUNTS</div>
                <div className="form-grid">
                  <div className="input-field">
                    <label>ONE-TIME</label>
                    <div className="input-addon suffix-mode">
                      <input
                        type="number"
                        value={services.discounts.oneTime}
                        onChange={(e) => handleServiceChange('discounts', 'oneTime', e.target.value)}
                      />
                      <span className="badge-suffix">%</span>
                    </div>
                  </div>
                  <div className="input-field">
                    <label>WEEKLY</label>
                    <div className="input-addon suffix-mode">
                      <input
                        type="number"
                        value={services.discounts.weekly}
                        onChange={(e) => handleServiceChange('discounts', 'weekly', e.target.value)}
                      />
                      <span className="badge-suffix">%</span>
                    </div>
                  </div>
                  <div className="input-field">
                    <label>BI-WEEKLY</label>
                    <div className="input-addon suffix-mode">
                      <input
                        type="number"
                        value={services.discounts.biWeekly}
                        onChange={(e) => handleServiceChange('discounts', 'biWeekly', e.target.value)}
                      />
                      <span className="badge-suffix">%</span>
                    </div>
                  </div>
                  <div className="input-field">
                    <label>MONTHLY</label>
                    <div className="input-addon suffix-mode">
                      <input
                        type="number"
                        value={services.discounts.monthly}
                        onChange={(e) => handleServiceChange('discounts', 'monthly', e.target.value)}
                      />
                      <span className="badge-suffix">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Cleaner Modal */}
      {showCleanerModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Cleaner</h3>
            <form onSubmit={handleAddCleanerSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={newCleaner.name}
                onChange={(e) => setNewCleaner({ ...newCleaner, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newCleaner.email}
                onChange={(e) => setNewCleaner({ ...newCleaner, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newCleaner.phone}
                onChange={(e) => setNewCleaner({ ...newCleaner, phone: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowCleanerModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Cleaner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;