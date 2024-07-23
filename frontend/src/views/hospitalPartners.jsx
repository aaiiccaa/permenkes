import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import { Outlet } from 'react-router-dom';
import '../App.css'; // Pastikan CSS diimpor

export default function HospitalPartners() {
    const [hospitalPartners, setHospitalPartners] = useState([]);
    const [filteredPartners, setFilteredPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State untuk pencarian nama rumah sakit
    const [searchClass, setSearchClass] = useState(''); // State untuk pencarian kelas
    const [searchRegional, setSearchRegional] = useState(''); // State untuk pencarian regional

    useEffect(() => {
        const fetchHospitalPartners = async () => {
            try {
                const response = await axiosClient.get('/hospital_partners');
                console.log('Fetched data:', response.data);
                if (Array.isArray(response.data)) {
                    setHospitalPartners(response.data);
                    setFilteredPartners(response.data); // Set data awal untuk filteredPartners
                } else {
                    console.error('Data is not an array:', response.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchHospitalPartners();
    }, []);

    useEffect(() => {
        // Filter data ketika searchTerm, searchClass, atau searchRegional berubah
        const results = hospitalPartners.filter(partner =>
            (partner.rumah_sakit.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
            (partner.kelas.toLowerCase().includes(searchClass.toLowerCase()) || searchClass === '') &&
            (partner.regional.toString().includes(searchRegional) || searchRegional === '')
        );
        setFilteredPartners(results);
    }, [searchTerm, searchClass, searchRegional, hospitalPartners]);

    const handlePartnerClick = async (id) => {
        try {
            const response = await axiosClient.get(`/hospital_partners/${id}`);
            setSelectedPartner(response.data);
        } catch (error) {
            console.error('Error fetching partner details:', error);
            setError('Failed to fetch partner details');
        }
    };

    return (
        <div>
            <header>
                <h1>Hospital Partners</h1>
            </header>
            <main>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by Hospital Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by Class"
                        value={searchClass}
                        onChange={(e) => setSearchClass(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by Regional"
                        value={searchRegional}
                        onChange={(e) => setSearchRegional(e.target.value)}
                    />
                </div>
                
                <div>
                    <h2>List of Partners</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Hospital</th>
                                <th>City</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Owner</th>
                                <th>Class</th>
                                <th>Region</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPartners.length === 0 ? (
                                <tr>
                                    <td colSpan="8">No data available</td>
                                </tr>
                            ) : (
                                filteredPartners.map((partner) => (
                                    <tr key={partner.id} onClick={() => handlePartnerClick(partner.id)}>
                                        <td>{partner.rumah_sakit}</td>
                                        <td>{partner.kab_kota}</td>
                                        <td>{partner.alamat}</td>
                                        <td>{partner.telepon}</td>
                                        <td>{partner.pemilik}</td>
                                        <td>{partner.kelas}</td>
                                        <td>{partner.regional}</td>
                                        <td>
                                            <button onClick={() => handlePartnerClick(partner.id)}>View Details</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {selectedPartner && (
                    <div>
                        <h2>Partner Details</h2>
                        <p><strong>Hospital:</strong> {selectedPartner.rumah_sakit}</p>
                        <p><strong>City:</strong> {selectedPartner.kab_kota}</p>
                        <p><strong>Address:</strong> {selectedPartner.alamat}</p>
                        <p><strong>Phone:</strong> {selectedPartner.telepon}</p>
                        <p><strong>Owner:</strong> {selectedPartner.pemilik}</p>
                        <p><strong>Class:</strong> {selectedPartner.kelas}</p>
                        <p><strong>Region:</strong> {selectedPartner.regional}</p>
                    </div>
                )}
                <Outlet /> {/* Render routed components here */}
            </main>
        </div>
    );
}
