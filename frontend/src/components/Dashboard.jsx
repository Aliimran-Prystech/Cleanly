import { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Plus, X } from 'lucide-react';
import Header from './Header';
import '../styles/components/Dashboard.scss';

const API_BASE_URL = 'http://localhost:5000/api';

const defaultServices = {
  baseTypes: { standard: 80, deep: 140, moveInOut: 200 },
  perRoomRate: 50,
  perBathRate: 60,
  addons: [],
  frequencyDiscounts: { oneTime: 0, weekly: 25, biWeekly: 15, monthly: 10 }
};

const tabs = [
  { id: 'bookings', label: 'Cleanings' },
  { id: 'cleaners', label: 'Cleaners' },
  { id: 'services', label: 'Services' }
];

const getId = (item) => item?._id || item?.id;

const formatDate = (value) => {
  if (!value) return '-';
  const date = String(value).slice(0, 10).split('-');
  if (date.length === 3 && date[0].length === 4) return `${date[1]}-${date[2]}-${date[0]}`;
  return value;
};

const formatLabel = (value) => String(value || '-').replace(/-/g, ' ');
const getServiceConfig = (response) => response?.serviceConfig || response?.data || response;
const getAssignedCleanerIds = (booking) => {
  const assigned = Array.isArray(booking?.assignedCleaner)
    ? booking.assignedCleaner
    : Array.isArray(booking?.assignedCleaners)
      ? booking.assignedCleaners
      : booking?.assignedCleaner
        ? [booking.assignedCleaner]
        : [];
  return assigned.map((cleaner) => getId(cleaner) || cleaner).filter(Boolean);
};

const Dashboard = ({ isLoggedIn = true, handleLogout }) => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [serviceConfig, setServiceConfig] = useState(defaultServices);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cleanerForm, setCleanerForm] = useState({ name: '', email: '', phone: '' });
  const [editingCleaner, setEditingCleaner] = useState(null);
  const [modal, setModal] = useState(null);
  const [savingServices, setSavingServices] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setError('');
    try {
      const [bookingResponse, cleanerResponse, serviceResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/bookings`),
        axios.get(`${API_BASE_URL}/cleaners`),
        axios.get(`${API_BASE_URL}/services`)
      ]);

      setBookings(bookingResponse.data?.bookings || []);
      setCleaners(cleanerResponse.data?.cleaners || []);
      const savedServices = getServiceConfig(serviceResponse.data);
      setServiceConfig({
        ...defaultServices,
        ...savedServices,
        baseTypes: { ...defaultServices.baseTypes, ...(savedServices?.baseTypes || {}) },
        frequencyDiscounts: { ...defaultServices.frequencyDiscounts, ...(savedServices?.frequencyDiscounts || {}) },
        addons: Array.isArray(savedServices?.addons) ? savedServices.addons : []
      });
    } catch (loadError) {
      console.error('Dashboard data load failed:', loadError);
      setError('Unable to load dashboard data. Check that the backend is running.');
    }
  };

  useEffect(() => {
    const loadTimer = window.setTimeout(loadData, 0);
    return () => window.clearTimeout(loadTimer);
  }, []);

  const updateServiceValue = (section, key, value) => {
    setServiceConfig((current) => ({
      ...current,
      [section]: { ...current[section], [key]: Number(value) }
    }));
  };

  const updateBookingCleaners = async (booking, cleanerIds) => {
    const bookingId = getId(booking);
    const payload = {
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      address: booking.address,
      zipCode: booking.zipCode,
      cleaningType: booking.cleaningType,
      frequency: booking.frequency,
      bedrooms: booking.bedrooms,
      bathrooms: booking.bathrooms,
      extras: booking.extras || [],
      specialReq: booking.specialReq || '',
      bookingDate: booking.bookingDate,
      timeSlot: booking.timeSlot,
      assignedCleaners: cleanerIds,
      assignedCleaner: cleanerIds,
      status: booking.status
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, payload);
      const updatedBooking = response.data?.booking;
      setBookings((current) => current.map((item) => (getId(item) === bookingId ? updatedBooking : item)));
    } catch (updateError) {
      console.error('Cleaner assignment failed:', updateError);
      setError('Unable to save the cleaner assignment.');
    }
  };

  const toggleBookingCleaner = (booking, cleanerId) => {
    const assignedIds = getAssignedCleanerIds(booking);
    const nextIds = assignedIds.includes(cleanerId)
      ? assignedIds.filter((id) => id !== cleanerId)
      : [...assignedIds, cleanerId];
    updateBookingCleaners(booking, nextIds);
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
      setBookings((current) => current.filter((booking) => getId(booking) !== bookingId));
    } catch (deleteError) {
      console.error('Booking deletion failed:', deleteError);
      setError('Unable to delete this booking.');
    }
  };

  const openCleanerModal = (cleaner = null) => {
    setEditingCleaner(cleaner);
    setCleanerForm({ name: cleaner?.name || '', email: cleaner?.email || '', phone: cleaner?.phone || '' });
    setModal('cleaner');
  };

  const saveCleaner = async (event) => {
    event.preventDefault();
    try {
      const url = editingCleaner ? `${API_BASE_URL}/cleaners/${getId(editingCleaner)}` : `${API_BASE_URL}/cleaners`;
      const response = editingCleaner ? await axios.put(url, cleanerForm) : await axios.post(url, cleanerForm);
      const savedCleaner = response.data?.cleaner;
      setCleaners((current) => editingCleaner
        ? current.map((cleaner) => (getId(cleaner) === getId(editingCleaner) ? savedCleaner : cleaner))
        : [savedCleaner, ...current]);
      setModal(null);
    } catch (saveError) {
      console.error('Cleaner save failed:', saveError);
      setError('Unable to save this cleaner.');
    }
  };

  const deleteCleaner = async (cleanerId) => {
    if (!window.confirm('Delete this cleaner?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/cleaners/${cleanerId}`);
      setCleaners((current) => current.filter((cleaner) => getId(cleaner) !== cleanerId));
    } catch (deleteError) {
      console.error('Cleaner deletion failed:', deleteError);
      setError('Unable to delete this cleaner.');
    }
  };

  const saveServices = async () => {
    setSavingServices(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/services/config`, serviceConfig);
      setServiceConfig(getServiceConfig(response.data));
    } catch (saveError) {
      console.error('Service configuration save failed:', saveError);
      setError('Unable to save service pricing.');
    } finally {
      setSavingServices(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="dashboard-container">
        <nav className="dashboard-tabs" aria-label="Dashboard sections">
          {tabs.map((tab) => <button type="button" className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} key={tab.id} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}
        </nav>

        {error && <div className="dashboard-alert">{error}</div>}

        {activeTab === 'bookings' && (
          <section className="tab-card">
            <div className="card-header-bar">Cleanings</div>
            <div className="card-body table-scroll">
              <table className="dash-table bookings-table">
                <thead><tr><th>ID</th><th>Cleaning Type</th><th>Date</th><th>Time</th><th>Cleaner</th><th>Actions</th></tr></thead>
                <tbody>
                  {bookings.map((booking, index) => {
                    const bookingId = getId(booking);
                    const assignedIds = getAssignedCleanerIds(booking);
                    return <tr key={bookingId || index}><td>{index + 1}</td><td>{formatLabel(booking.cleaningType)}</td><td>{formatDate(booking.bookingDate)}</td><td>{booking.timeSlot || '-'}</td><td><div className="cleaner-assignment"><div className="cleaner-chips">{assignedIds.map((cleanerId) => <span className="cleaner-chip" key={cleanerId}>{cleaners.find((cleaner) => getId(cleaner) === cleanerId)?.name || cleanerId}<button type="button" aria-label="Remove cleaner" onClick={() => toggleBookingCleaner(booking, cleanerId)}><X size={12} /></button></span>)}</div><select aria-label={`Add cleaner to booking ${index + 1}`} value="" onChange={(event) => toggleBookingCleaner(booking, event.target.value)}><option value="">Select...</option>{cleaners.filter((cleaner) => !assignedIds.includes(getId(cleaner))).map((cleaner) => <option key={getId(cleaner)} value={getId(cleaner)}>{cleaner.name}</option>)}</select></div></td><td className="action-buttons"><button type="button" className="icon-button view" title="View booking" onClick={() => { setSelectedBooking(booking); setModal('booking'); }}><Eye size={16} /></button><button type="button" className="icon-button delete" title="Delete booking" onClick={() => deleteBooking(bookingId)}><X size={17} /></button></td></tr>;
                  })}
                  {!bookings.length && <tr><td className="empty-state" colSpan="6">No bookings found.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'cleaners' && (
          <section className="tab-card">
            <div className="card-header-bar card-header-actions"><span>Cleaners</span><button type="button" className="primary-button" onClick={() => openCleanerModal()}><Plus size={16} /> Add Cleaner</button></div>
            <div className="card-body table-scroll"><table className="dash-table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead><tbody>{cleaners.map((cleaner) => <tr key={getId(cleaner)}><td>{cleaner.name}</td><td>{cleaner.email}</td><td>{cleaner.phone}</td><td className="action-buttons"><button type="button" className="text-button" onClick={() => openCleanerModal(cleaner)}>Edit</button><button type="button" className="text-button danger" onClick={() => deleteCleaner(getId(cleaner))}>Delete</button></td></tr>)}{!cleaners.length && <tr><td className="empty-state" colSpan="4">No cleaners found.</td></tr>}</tbody></table></div>
          </section>
        )}

        {activeTab === 'services' && (
          <section className="tab-card services-card">
            <div className="card-header-bar card-header-actions"><span>Service Pricing</span><button type="button" className="primary-button" onClick={saveServices} disabled={savingServices}>{savingServices ? 'Saving...' : 'Save Changes'}</button></div>
            <div className="card-body service-sections">
              {[['DEEP', 'deep'], ['MOVE IN-OUT', 'moveInOut'], ['STANDARD', 'standard']].map(([label, key]) => <div className="service-group" key={key}><div className="group-header">{label}</div><div className="group-body"><PriceInput label="Base Price" value={serviceConfig.baseTypes[key]} onChange={(value) => updateServiceValue('baseTypes', key, value)} /><PriceInput label="Cost Per Bedroom" value={serviceConfig.perRoomRate} onChange={(value) => setServiceConfig((current) => ({ ...current, perRoomRate: Number(value) }))} /><PriceInput label="Cost Per Bathroom" value={serviceConfig.perBathRate} onChange={(value) => setServiceConfig((current) => ({ ...current, perBathRate: Number(value) }))} />{serviceConfig.addons.map((addon, index) => <PriceInput key={`${addon.name}-${index}`} label={`Addon - ${addon.name}`} value={addon.price} onChange={(value) => setServiceConfig((current) => ({ ...current, addons: current.addons.map((item, itemIndex) => itemIndex === index ? { ...item, price: Number(value) } : item) }))} />)}</div></div>)}
              <div className="service-group"><div className="group-header">DISCOUNTS</div><div className="group-body">{[['ONE-TIME', 'oneTime'], ['WEEKLY', 'weekly'], ['BI-WEEKLY', 'biWeekly'], ['MONTHLY', 'monthly']].map(([label, key]) => <PriceInput key={key} label={label} suffix="%" value={serviceConfig.frequencyDiscounts[key]} onChange={(value) => updateServiceValue('frequencyDiscounts', key, value)} />)}</div></div>
            </div>
          </section>
        )}
      </main>

      {modal === 'booking' && selectedBooking && <Modal title="Full Details" onClose={() => setModal(null)}><dl className="booking-details">{[
        ['date', formatDate(selectedBooking.bookingDate)],
        ['cleaningType', formatLabel(selectedBooking.cleaningType)],
        ['cost', Number(selectedBooking.totalCost ?? 0).toFixed(2)],
        ['time', selectedBooking.timeSlot],
        ['extraService', selectedBooking.extras?.join(', ') || ''],
        ['email', selectedBooking.customerEmail],
        ['phoneNum', selectedBooking.customerPhone],
        ['cleaners', getAssignedCleanerIds(selectedBooking).map((id) => cleaners.find((cleaner) => getId(cleaner) === id)?.name || id).join(', ')],
        ['cleaningOccurance', selectedBooking.frequency],
        ['name', selectedBooking.customerName],
        ['dateCreated', selectedBooking.createdAt],
        ['zipCode', selectedBooking.zipCode],
        ['specialRequirements', selectedBooking.specialReq || ''],
        ['address', selectedBooking.address],
        ['bedrooms', selectedBooking.bedrooms],
        ['bathrooms', selectedBooking.bathrooms]
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value ?? ''}</dd></div>)}</dl></Modal>}
      {modal === 'cleaner' && <Modal title={editingCleaner ? 'Edit Cleaner' : 'Add Cleaner'} onClose={() => setModal(null)}><form className="cleaner-form" onSubmit={saveCleaner}><label>Name<input required value={cleanerForm.name} onChange={(event) => setCleanerForm({ ...cleanerForm, name: event.target.value })} /></label><label>Email<input required type="email" value={cleanerForm.email} onChange={(event) => setCleanerForm({ ...cleanerForm, email: event.target.value })} /></label><label>Phone<input required value={cleanerForm.phone} onChange={(event) => setCleanerForm({ ...cleanerForm, phone: event.target.value })} /></label><button className="primary-button" type="submit">Save Cleaner</button></form></Modal>}
    </div>
  );
};

const PriceInput = ({ label, value, suffix, onChange }) => <label className="service-field"><span>{label}</span><div className={`input-control ${suffix ? 'has-suffix' : ''}`}>{!suffix && <b>$</b>}<input type="number" min="0" value={value ?? 0} onChange={(event) => onChange(event.target.value)} />{suffix && <b>{suffix}</b>}</div></label>;

const Modal = ({ title, onClose, children }) => <div className="modal-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal"><div className="modal-header"><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Close"><X size={20} /></button></div><div className="modal-body">{children}</div></div></div>;

export default Dashboard;
