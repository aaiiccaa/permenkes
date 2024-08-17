import React, { useState } from 'react';
import axiosClient from '../axiosClient';
import { useStateContext } from "../contexts/contextprovider";
import * as XLSX from "xlsx";
import '../App.css';

export default function HospitalPartners() {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(false);
    const [searchRs, setSearchRs] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedKelasRawat, setSelectedKelasRawat] = useState('');
    const [searchArea, setSearchArea] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [searchKode, setSearchKode] = useState('');
    const [searchDesc, setSearchDesc] = useState('');
    const [selectedkategori, setSelectedKategori] = useState('');
    const [selectedRegional, setSelectedRegional] = useState('');
    const [selectedPemilik, setSelectedPemilik] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    const {user, token, setUser, setToken} = useStateContext();

    const handleSearch = async (endpoint, params) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosClient.get(endpoint, { params });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
            setStatus(true);
        }
    };

    const setStatusFalse = () => {
        setStatus(false);
    }

    const setFieldNull = () => {
        setSearchRs(null);
        setSelectedClass(null);
        setSelectedKelasRawat(null);
        setSearchArea(null);
        setSearchKode(null);
        setSearchDesc(null);
        setSelectedKategori(null);
        setSelectedRegional(null);
        setSelectedPemilik(null);
        setSelectedStatus(null);
        setEditData(null);
        setShowDialog(false);
    }

    const searchHospitals = () => {
        const params = {};
        if (searchRs) params.rs = searchRs;
        if (selectedClass) params.kelas = selectedClass;
        if (searchArea) params.area = searchArea;
        if (selectedPemilik) params.pemilik = selectedPemilik;
        if (selectedStatus) params.status = selectedStatus;
        handleSearch('/hospital_partners', params);
    };

    const searchInapPusat = () => {
        const params = {};
        if (searchKode) params.kode = searchKode;
        if (searchDesc) params.deskripsi = searchDesc;
        if (searchRs) params.rs = searchRs;
        handleSearch('/inap_pusat', params);
    };

    const searchInapUmum = () => {
        const params = {};
        if (searchKode) params.kode = searchKode;
        if (searchDesc) params.deskripsi = searchDesc;
        if (selectedClass) params.kelas = selectedClass;
        if (selectedRegional) params.regional = selectedRegional;
        if (selectedkategori) params.kategori = selectedkategori;
        handleSearch('/inap_umum', params);
    };

    const searchJalanUmum = () => {
        const params = {};
        if (searchKode) params.kode = searchKode;
        if (searchDesc) params.deskripsi = searchDesc;
        if (selectedClass) params.kelas = selectedClass;
        if (selectedRegional) params.regional = selectedRegional;
        if (selectedkategori) params.kategori = selectedkategori;
        handleSearch('/jalan_umum', params);
    };

    const searchJalanPusat = () => {
        const params = {};
        if (searchKode) params.kode = searchKode;
        if (searchDesc) params.deskripsi = searchDesc;
        if (searchRs) params.rs = searchRs;
        handleSearch('/jalan_pusat', params);
    };

    const searchTopupUmum = () => {
        const params = {};
        if (searchKode) params.kode = searchKode;
        if (searchDesc) params.deskripsi = searchDesc;
        if (selectedKelasRawat) params.kelas_rawat = selectedKelasRawat;
        if (selectedRegional) params.regional = selectedRegional;
        if (selectedkategori) params.kategori = selectedkategori;
        handleSearch('/topup_umum', params);
    };

    const searchTopupPusat = () => {
        const params = {};
        if (searchKode) params.kode = searchKode;
        if (searchDesc) params.deskripsi = searchDesc;
        if (selectedKelasRawat) params.kelas = selectedKelasRawat;
        handleSearch('/topup_pusat', params);
    };

    const formatCurrency = (value) => {
        if (value === '-') {
            return value;
        }
        return Number(value).toLocaleString('id-ID');
    };

    const handleDownload = async () => {
        const params = {};
        if (searchRs) params.rs = searchRs;
        if (selectedClass) params.kelas = selectedClass;
        if (searchArea) params.area = searchArea;
        if (selectedPemilik) params.pemilik = selectedPemilik;
        if (selectedStatus) params.status = selectedStatus;

        const response = await axiosClient.get('/hospital_partners', { params });
        const data = response.data;

        const rows = data.map((item) => ({
            rumah_sakit: item.rumah_sakit,
            kab_kota: item.kab_kota,
            alamat: item.alamat,
            telepon: item.telepon,
            pemilik: item.pemilik,
            kelas: item.kelas,
            regional: item.regional,
            status: item.status,
            kategori: item.kategori,
        }));
    
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(rows);
    
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rumah Sakit");
    
        XLSX.utils.sheet_add_aoa(worksheet, [
            ["rumah_sakit", "kab_kota", "alamat", "telepon", "pemilik", "kelas", "regional", "status", "kategori"],
        ]);
    
        XLSX.writeFile(workbook, "data-rs.xlsx", { compression: true });
    };

    const handleEdit = (id) => {
        const selectedData = data.find(data => data.id === id);
        if (selectedData) {
            setEditData(selectedData); 
            setShowDialog(true); 
        }
    };

    const getEndpoint = (menu, id) => {
        const endpoints = {
            rs: `/hospital_partners/${id}`,
            inapPusat: `/inap_pusat/${id}`,
            inapUmum: `/inap_umum/${id}`,
            jalanUmum: `/jalan_umum/${id}`,
            jalanPusat: `/jalan_pusat/${id}`,
            topupUmum: `/topup_umum/${id}`,
            topupPusat: `/topup_pusat/${id}`,
        };
    
        return endpoints[menu] || null;
    };
    
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const endpoint = getEndpoint(selectedMenu, editData.id);
            if (!endpoint) throw new Error('Invalid menu selection');
    
            await axiosClient.put(endpoint, editData);
            alert('Data updated successfully');
            setShowDialog(false);
    
            reloadData(selectedMenu);
        } catch (error) {
            console.error('Error updating data:', error);
            setError('Failed to update data');
        } finally {
            setLoading(false);
        }
    };
    
    const handleDelete = async (id) => {
        if (!window.confirm("Apakah anda yakin ingin hapus data?")) {
            return;
        }
        setLoading(true);
        setError(null);
    
        try {
            const endpoint = getEndpoint(selectedMenu, id);
            if (!endpoint) throw new Error('Invalid menu selection');
    
            await axiosClient.delete(endpoint);
            alert('Data deleted successfully');
    
            reloadData(selectedMenu);
        } catch (error) {
            console.error('Error deleting data:', error);
            setError('Failed to delete data');
        } finally {
            setLoading(false);
        }
    };
    
    const reloadData = (menu) => {
        const actions = {
            rs: searchHospitals,
            inapPusat: searchInapPusat,
            inapUmum: searchInapUmum,
            jalanUmum: searchJalanUmum,
            jalanPusat: searchJalanPusat,
            topupUmum: searchTopupUmum,
            topupPusat: searchTopupPusat,
        };
    
        const action = actions[menu];
        if (action) {
            action();
        } else {
            console.error('Invalid menu selection');
        }
    };
    
    

    return (
        <div className='child-page'>
            <header>
                <h1>Search Tool</h1>
            </header>
            <main>
                <div className='input-group'>
                    <div className='search-container'>
                        <select value={selectedMenu} onChange={(e) => { setSelectedMenu(e.target.value); setStatusFalse(); setFieldNull();}}>
                            <option value="">Pilih Menu</option>
                            <option value="inapUmum">Tarif Rawat Inap RS Umum</option>
                            <option value="inapPusat">Tarif Rawat Inap RS Pusat</option>
                            <option value="jalanUmum">Tarif Rawat Jalan RS Umum</option>
                            <option value="jalanPusat">Tarif Rawat Jalan RS Pusat</option>
                            <option value="topupUmum">Tarif Topup RS Umum</option>
                            <option value="topupPusat">Tarif Topup RS Pusat</option>
                            <option value="rs">Rumah Sakit</option>
                        </select>
                    </div>
                    {selectedMenu === 'rs' && (
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Rumah Sakit"
                                value={searchRs}
                                onChange={(e) => setSearchRs(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Kabupaten/Kota"
                                value={searchArea}
                                onChange={(e) => setSearchArea(e.target.value)}
                            />
                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                <option value="">Kelas</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                            <select value={selectedPemilik} onChange={(e) => setSelectedPemilik(e.target.value)}>
                                <option value="">Kategori</option>
                                <option value="Pemerintah">Pemerintah</option>
                                <option value="Swasta">Swasta</option>
                            </select>
                            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                <option value="">Status</option>
                                <option value="Mitra">Mitra</option>
                                <option value="Non Mitra">Non Mitra</option>
                            </select>
                            <button className='search' onClick={searchHospitals}>Cari</button>
                        </div>
                    )}
                    {selectedMenu === 'inapPusat' && (
                        <div className="search-container">
                        <input
                            type="text"
                            placeholder="Deskripsi Kode INA-CBG"
                            value={searchDesc}
                            onChange={(e) => setSearchDesc(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Kode INA-CBG"
                            value={searchKode}
                            onChange={(e) => setSearchKode(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Rumah Sakit"
                            value={searchRs}
                            onChange={(e) => setSearchRs(e.target.value)}
                        />
                        <button className='search' onClick={searchInapPusat}>Cari</button>
                    </div>
                    )}
                    {selectedMenu === 'inapUmum' && (
                        <div className="search-container">
                        <input
                            type="text"
                            placeholder="Deskripsi Kode INA-CBG"
                            value={searchDesc}
                            onChange={(e) => setSearchDesc(e.target.value)}
                        />
                            <input
                                type="text"
                                placeholder="Kode INA-CBG"
                                value={searchKode}
                                onChange={(e) => setSearchKode(e.target.value)}
                            />
                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                <option value="">Kelas</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                            <select value={selectedRegional} onChange={(e) => setSelectedRegional(e.target.value)}>
                                <option value="">Regional</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <select value={selectedkategori} onChange={(e) => setSelectedKategori(e.target.value)}>
                                <option value="">Kategori</option>
                                <option value="Pemerintah">Pemerintah</option>
                                <option value="Swasta">Swasta</option>
                            </select>
                            <button className='search' onClick={searchInapUmum}>Cari</button>
                        </div>
                    )}
                    {selectedMenu === 'jalanUmum' && (
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Deskripsi Kode INA-CBG"
                                value={searchDesc}
                                onChange={(e) => setSearchDesc(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Kode INA-CBG"
                                value={searchKode}
                                onChange={(e) => setSearchKode(e.target.value)}
                            />
                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                <option value="">Kelas</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                            <select value={selectedRegional} onChange={(e) => setSelectedRegional(e.target.value)}>
                                <option value="">Regional</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <select value={selectedkategori} onChange={(e) => setSelectedKategori(e.target.value)}>
                                <option value="">Kategori</option>
                                <option value="Pemerintah">Pemerintah</option>
                                <option value="Swasta">Swasta</option>
                            </select>
                            <button className='search' onClick={searchJalanUmum}>Cari</button>
                        </div>
                    )}
                    {selectedMenu === 'jalanPusat' && (
                        <div className="search-container">
                        <input
                            type="text"
                            placeholder="Deskripsi Kode INA-CBG"
                            value={searchDesc}
                            onChange={(e) => setSearchDesc(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Kode INA-CBG"
                            value={searchKode}
                            onChange={(e) => setSearchKode(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Rumah Sakit"
                            value={searchRs}
                            onChange={(e) => setSearchRs(e.target.value)}
                        />
                        <button className='search' onClick={searchJalanPusat}>Cari</button>
                    </div>
                    )}
                    {selectedMenu === 'topupUmum' && (
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Deskripsi Kode INA-CBG"
                                value={searchDesc}
                                onChange={(e) => setSearchDesc(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Kode INA-CBG"
                                value={searchKode}
                                onChange={(e) => setSearchKode(e.target.value)}
                            />
                            <select value={selectedKelasRawat} onChange={(e) => setSelectedKelasRawat(e.target.value)}>
                                <option value="">Kelas Rawat</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <select value={selectedRegional} onChange={(e) => setSelectedRegional(e.target.value)}>
                                <option value="">Regional</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <select value={selectedkategori} onChange={(e) => setSelectedKategori(e.target.value)}>
                                <option value="">Kategori</option>
                                <option value="Pemerintah">Pemerintah</option>
                                <option value="Swasta">Swasta</option>
                            </select>
                            <button className='search' onClick={searchTopupUmum}>Cari</button>
                        </div>
                    )}
                    {selectedMenu === 'topupPusat' && (
                        <div className="search-container">
                        <input
                            type="text"
                            placeholder="Deskripsi Kode INA-CBG"
                            value={searchDesc}
                            onChange={(e) => setSearchDesc(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Kode INA-CBG"
                            value={searchKode}
                            onChange={(e) => setSearchKode(e.target.value)}
                        />
                        <select value={selectedKelasRawat} onChange={(e) => setSelectedKelasRawat(e.target.value)}>
                                <option value="">Kelas Rawat</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        <button className='search' onClick={searchTopupPusat}>Cari</button>
                    </div>
                    )}
                </div>
                

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                {data.length == 0 && status &&
                <>
                <br />
                <p>Data tidak ditemukan</p>
                </>
                }

                {data.length > 0 && selectedMenu === 'rs' &&  status &&(
                    <div>
                        <div className="title-container">
                            <h2>Rumah Sakit</h2>
                            <button onClick={handleDownload}>Download excel</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rumah Sakit</th>
                                    <th>Pemilik</th>
                                    <th>Kelas</th>
                                    <th>Regional</th>
                                    <th>Kategori</th>
                                    <th>Status</th>
                                    <th>Alamat</th>
                                    <th>Area</th>
                                    {token && <th>Aksi</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.rumah_sakit}</td>
                                        <td className='center'>{data.pemilik}</td>
                                        <td className='center'>{data.kelas}</td>
                                        <td className='center'>{data.regional}</td>
                                        <td className='center'>{data.kategori}</td>
                                        <td className='center'>{data.status}</td>
                                        <td>{data.alamat}</td>
                                        <td>{data.kab_kota}</td>
                                        {token &&
                                        <td>
                                            <div className="button-container">
                                                <button className="edit" onClick={() => handleEdit(data.id)}>Edit</button>
                                                <button className="delete" onClick={ev => handleDelete(data.id)}>Hapus</button>
                                            </div>
                                        </td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {data.length > 0 && selectedMenu === 'inapPusat' && status &&(
                    <div>
                        <h2>Tarif Rawat Inap Rumah Sakit Pusat</h2>
                        <table>
                            <thead>
                                <tr>
                                <th>Kode INA-CBG</th>
                                <th>Deskripsi Kode INA-CBG</th>
                                <th>Tarif Kelas 3</th>
                                <th>Tarif Kelas 2</th>
                                <th>Tarif Kelas 1</th>
                                <th>Rumah Sakit</th>
                                {token && <th>Aksi</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data) => (
                                    <tr key={data.id}>
                                    <td className='center'>{data.kode}</td>
                                    <td>{data.deskripsi}</td>
                                    <td className='center'>Rp. {formatCurrency(data.tarif_3)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.tarif_2)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.tarif_1)}</td>
                                    <td>{data.rumah_sakit}</td>
                                    {token &&
                                    <td>
                                        <div className="button-container">
                                            <button className="edit" onClick={() => handleEdit(data.id)}>Edit</button>
                                        </div>
                                    </td>
                                    }
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {data.length > 0 && selectedMenu === 'inapUmum' && status &&(
                    <div>
                        <h2>Tarif Rawat Inap Rumah Sakit Umum</h2>
                        <table>
                            <thead>
                                <tr>
                                <th>Kode INA-CBG</th>
                                <th>Deskripsi Kode INA-CBG</th>
                                <th>Tarif Kelas 3</th>
                                <th>Tarif Kelas 2</th>
                                <th>Tarif Kelas 1</th>
                                <th>Regional</th>
                                <th>Kelas</th>
                                <th>Kategori</th>
                                {token && <th>Aksi</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data) => (
                                    <tr key={data.id}>
                                    <td className='center'>{data.kode}</td>
                                    <td>{data.deskripsi}</td>
                                    <td className='center'>Rp. {formatCurrency(data.tarif_3)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.tarif_2)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.tarif_1)}</td>
                                    <td className='center'>{data.regional}</td>
                                    <td className='center'>{data.kelas}</td>
                                    <td className='center'>{data.kategori}</td>
                                    {token &&
                                    <td>
                                        <div className="button-container">
                                            <button className="edit" onClick={() => handleEdit(data.id)}>Edit</button>
                                        </div>
                                    </td>
                                    }
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {data.length > 0 && selectedMenu === 'jalanUmum' && status &&(
                    <div>
                        <h2>Tarif Rawat Jalan Rumah Sakit Umum</h2>
                        <table>
                            <thead>
                                <tr>
                                <th>Kode INA-CBG</th>
                                <th>Deskripsi Kode INA-CBG</th>
                                <th>Tarif</th>
                                <th>Regional</th>
                                <th>Kelas</th>
                                <th>Kategori</th>
                                {token && <th>Aksi</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data) => (
                                    <tr key={data.id}>
                                    <td className='center'>{data.kode}</td>
                                    <td>{data.deskripsi}</td>
                                    <td>Rp. {formatCurrency(data.tarif)}</td>
                                    <td className='center'>{data.regional}</td>
                                    <td className='center'>{data.kelas}</td>
                                    <td className='center'>{data.kategori}</td>
                                    <td>
                                        <div className="button-container">
                                            <button className="edit" onClick={() => handleEdit(data.id)}>Edit</button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}      
                {data.length > 0 && selectedMenu === 'jalanPusat' && status &&(
                    <div>
                        <h2>Tarif Rawat Inap Rumah Sakit Pusat</h2>
                        <table>
                            <thead>
                                <tr>
                                <th>Kode INA-CBG</th>
                                <th>Deskripsi Kode INA-CBG</th>
                                <th>Tarif</th>
                                <th>Rumah Sakit</th>
                                {token && <th>Aksi</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data) => (
                                    <tr key={data.id}>
                                    <td className='center'>{data.kode}</td>
                                    <td>{data.deskripsi}</td>
                                    <td className='center'>Rp. {formatCurrency(data.tarif)}</td>
                                    <td>{data.rumah_sakit}</td>
                                    <td>
                                        <div className="button-container">
                                            <button className="edit" onClick={() => handleEdit(data.id)}>Edit</button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {data.length > 0 && selectedMenu === 'topupUmum' && status &&(
                    <div>
                        <h2>Tarif Topup Rumah Sakit Umum</h2>
                        <table>
                            <thead>
                                <tr>
                                <th>Kode Spesial</th>
                                <th>Deskripsi Spesial CMG</th>
                                <th>Kode INA-CBG</th>
                                <th>Kelas Rawat</th>
                                <th>Kelas A</th>
                                <th>Kelas B</th>
                                <th>Kelas C</th>
                                <th>kelas D</th>
                                <th>Regional</th>
                                <th>Kategori</th>
                                {token && <th>Aksi</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data) => (
                                    <tr key={data.id}>
                                    <td className='center'>{data.kode_spesial}</td>
                                    <td>{data.deskripsi}</td>
                                    <td className='center'>{data.kode}</td>
                                    <td className='center'>{data.kelas_rawat}</td>
                                    <td className='center'>Rp. {formatCurrency(data.kelas_a)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.kelas_b)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.kelas_c)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.kelas_d)}</td>
                                    <td className='center'>{data.regional}</td>
                                    <td className='center'>{data.kategori}</td>
                                    <td>
                                        <div className="button-container">
                                            <button className="edit" onClick={() => handleEdit(data.id)}>Edit</button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {data.length > 0 && selectedMenu === 'topupPusat' && status &&(
                    <div>
                        <h2>Tarif Topup Rumah Sakit Pusat</h2>
                        <table>
                            <thead>
                                <tr>
                                <th>Kode Spesial</th>
                                <th>Deskripsi Spesial CMG</th>
                                <th>Kode INA-CBG</th>
                                <th>Kelas Rawat</th>
                                <th>rscm</th>
                                <th>rsjp_hk</th>
                                <th>rsab_hk</th>
                                <th>rsk</th>
                                <th>rspon</th>
                                {token && <th>Aksi</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data) => (
                                    <tr key={data.id}>
                                    <td className='center'>{data.kode_spesial}</td>
                                    <td>{data.deskripsi}</td>
                                    <td className='center'>{data.kode}</td>
                                    <td className='center'>{data.kelas}</td>
                                    <td className='center'>Rp. {formatCurrency(data.rscm)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.rsjp_hk)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.rsab_hk)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.rsk)}</td>
                                    <td className='center'>Rp. {formatCurrency(data.rspon)}</td>
                                    <td>
                                        <div className="button-container">
                                            <button className="edit" onClick={() => handleEdit(data.id)}>Edit</button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {showDialog && selectedMenu === 'rs' &&(
                    <div className="dialog">
                        <div className="dialog-content">
                            <h2>Edit Rumah Sakit</h2>
                            <form onSubmit={handleEditSubmit}>
                                <div className="input-group-edit">
                                    <label>Nama Rumah Sakit</label>
                                    <input
                                        type="text"
                                        value={editData?.rumah_sakit || ''}
                                        onChange={(e) => setEditData({ ...editData, rumah_sakit: e.target.value })}
                                        placeholder="Nama Rumah Sakit"
                                        required
                                    />
                                </div>
                                <div className="input-group-edit">
                                    <label>Pemilik</label>
                                    <select
                                    value={editData?.pemilik || ''}
                                    onChange={(e) => setEditData({ ...editData, pemilik: e.target.value })}
                                    required
                                    >
                                    <option value="" disabled>Pilih Pemilik</option>
                                    <option value="Pemerintah">Pemerintah</option>
                                    <option value="Swasta">Swasta</option>
                                </select>
                                </div>
                                <div className="input-group-edit">
                                    <label>Kelas</label>
                                    <select
                                    value={editData?.kelas || ''}
                                    onChange={(e) => setEditData({ ...editData, kelas: e.target.value })}
                                    required
                                    >
                                    <option value="" disabled>Pilih Kelas</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                                </div>
                                <div className="input-group-edit">
                                    <label>Regional</label>
                                    <select
                                    value={editData?.regional || ''}
                                    onChange={(e) => setEditData({ ...editData, regional: e.target.value })}
                                    required
                                    >
                                    <option value="" disabled>Pilih Regional</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                </div>
                                <div className="input-group-edit">
                                    <label>Kategori RS</label>
                                    <select
                                    value={editData?.kategori || ''}
                                    onChange={(e) => setEditData({ ...editData, kategori: e.target.value })}
                                    required
                                    >
                                    <option value="" disabled>Select Kelas</option>
                                    <option value="Umum">Umum</option>
                                    <option value="Pusat">Pusat</option>
                                </select>
                                </div>
                                <div className="input-group-edit">
                                    <label>Status</label>
                                    <select
                                    value={editData?.status || ''}
                                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                    required
                                    >
                                    <option value="" disabled>Pilih Status</option>
                                    <option value="Mitra">Mitra</option>
                                    <option value="Non Mitra">Non Mitra</option>
                                </select>
                                </div>
                                <div className="input-group-edit">
                                    <label>Alamat</label>
                                    <input
                                        type="text"
                                        value={editData?.alamat || ''}
                                        onChange={(e) => setEditData({ ...editData, alamat: e.target.value })}
                                        placeholder="Alamat"
                                        required
                                    />
                                </div>
                                <div className="input-group-edit">
                                    <label>Kabupaten/Kota</label>
                                    <input
                                        type="text"
                                        value={editData?.kab_kota || ''}
                                        onChange={(e) => setEditData({ ...editData, kab_kota: e.target.value })}
                                        placeholder="Kabupaten/Kota"
                                        required
                                    />
                                </div>
                                <div className="input-group-edit">
                                    <label>Telepon</label>
                                    <input
                                        type="text"
                                        value={editData?.telepon || ''}
                                        onChange={(e) => setEditData({ ...editData, telepon: e.target.value })}
                                        placeholder="Telepon"
                                        required
                                    />
                                </div>
                                <br />
                                <button type="submit">Simpan</button>
                            </form>
                            <br />
                            <button onClick={() => setShowDialog(false)}>Batal</button>
                        </div>
                    </div>
                )}
                {showDialog && (selectedMenu !== 'rs') &&(
                    <div className="dialog">
                        <div className="dialog-content">
                            <h2>Edit Tarif</h2>
                            <form onSubmit={handleEditSubmit}>
                                <div className="input-group-edit">
                                    <label>Penyakit</label>
                                    <input
                                        type="text"
                                        value={editData?.deskripsi || ''}
                                        required
                                        disabled
                                    />
                                </div>
                                {(selectedMenu === 'inapPusat' || selectedMenu === 'inapUmum') && (
                                    <>
                                    <div className="input-group-edit">
                                    <label>Tarif Kelas 1</label>
                                    <input
                                        type="text"
                                        value={editData?.tarif_1 || ''}
                                        onChange={(e) => setEditData({ ...editData, tarif_1: e.target.value })}
                                        placeholder="Tarif kelas 1"
                                        required
                                    />
                                </div>
                                <div className="input-group-edit">
                                    <label>Tarif Kelas 2</label>
                                    <input
                                        type="text"
                                        value={editData?.tarif_2 || ''}
                                        onChange={(e) => setEditData({ ...editData, tarif_2: e.target.value })}
                                        placeholder="Tarif kelas 2"
                                        required
                                    />
                                </div>
                                <div className="input-group-edit">
                                    <label>Tarif Kelas 3</label>
                                    <input
                                        type="text"
                                        value={editData?.tarif_3 || ''}
                                        onChange={(e) => setEditData({ ...editData, tarif_3: e.target.value })}
                                        placeholder="Tarif kelas 3"
                                        required
                                    />
                                </div>
                                    </>
                                )}
                                {(selectedMenu === 'jalanPusat' || selectedMenu === 'jalanUmum') && (
                                    <>
                                    <div className="input-group-edit">
                                        <label>Tarif</label>
                                        <input
                                            type="text"
                                            value={editData?.tarif || ''}
                                            onChange={(e) => setEditData({ ...editData, tarif: e.target.value })}
                                            placeholder="Tarif rawat jalan"
                                            required
                                        />
                                    </div>
                                    </>
                                )}
                                {selectedMenu === 'topupUmum' && (
                                    <>
                                    <div className="input-group-edit">
                                        <label>Tarif Kelas A</label>
                                        <input
                                            type="text"
                                            value={editData?.kelas_a || ''}
                                            onChange={(e) => setEditData({ ...editData, kelas_a: e.target.value })}
                                            placeholder="Tarif kelas A"
                                            required
                                        />
                                    </div>
                                    <div className="input-group-edit">
                                        <label>Tarif Kelas B</label>
                                        <input
                                            type="text"
                                            value={editData?.kelas_b || ''}
                                            onChange={(e) => setEditData({ ...editData, kelas_b: e.target.value })}
                                            placeholder="Tarif kelas B"
                                            required
                                        />
                                    </div>
                                    <div className="input-group-edit">
                                        <label>Tarif Kelas C</label>
                                        <input
                                            type="text"
                                            value={editData?.kelas_c || ''}
                                            onChange={(e) => setEditData({ ...editData, kelas_c: e.target.value })}
                                            placeholder="Tarif kelas C"
                                            required
                                        />
                                    </div>
                                    <div className="input-group-edit">
                                        <label>Tarif Kelas D</label>
                                        <input
                                            type="text"
                                            value={editData?.kelas_d || ''}
                                            onChange={(e) => setEditData({ ...editData, kelas_d: e.target.value })}
                                            placeholder="Tarif kelas D"
                                            required
                                        />
                                    </div>
                                    </>
                                )}
                                {selectedMenu === 'topupPusat' && (
                                    <>
                                    <div className="input-group-edit">
                                        <label>Tarif rscm</label>
                                        <input
                                            type="text"
                                            value={editData?.rscm || ''}
                                            onChange={(e) => setEditData({ ...editData, rscm: e.target.value })}
                                            placeholder="Tarif rscm"
                                            required
                                        />
                                    </div>
                                    <div className="input-group-edit">
                                        <label>Tarif rsjp_hk</label>
                                        <input
                                            type="text"
                                            value={editData?.rsjp_hk || ''}
                                            onChange={(e) => setEditData({ ...editData, rsjp_hk: e.target.value })}
                                            placeholder="Tarif rsjp_hk"
                                            required
                                        />
                                    </div>
                                    <div className="input-group-edit">
                                        <label>Tarif rsab_hk</label>
                                        <input
                                            type="text"
                                            value={editData?.rsab_hk || ''}
                                            onChange={(e) => setEditData({ ...editData, rsab_hk: e.target.value })}
                                            placeholder="Tarif rsab_hk"
                                            required
                                        />
                                    </div>
                                    <div className="input-group-edit">
                                        <label>Tarif rsk</label>
                                        <input
                                            type="text"
                                            value={editData?.rsk || ''}
                                            onChange={(e) => setEditData({ ...editData, rsk: e.target.value })}
                                            placeholder="Tarif rsk"
                                            required
                                        />
                                    </div>
                                    <div className="input-group-edit">
                                        <label>Tarif rspon</label>
                                        <input
                                            type="text"
                                            value={editData?.rspon || ''}
                                            onChange={(e) => setEditData({ ...editData, rspon: e.target.value })}
                                            placeholder="Tarif rspon"
                                            required
                                        />
                                    </div>
                                    </>
                                )}
                                <br />
                                <button type="submit">Simpan</button>
                            </form>
                            <br />
                            <button onClick={() => setShowDialog(false)}>Batal</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
