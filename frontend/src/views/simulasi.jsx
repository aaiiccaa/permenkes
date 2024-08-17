import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import axiosClient from '../axiosClient';
import '../App.css';

export default function Simulasi() {
    const [searchRs, setSearchRs] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedKelasRawat, setSelectedKelasRawat] = useState('');
    const [deskripsiSeverity, setDeskripsiSeverity] = useState([{ deskripsi: '', severity: '' }]);
    const [results, setResults] = useState([]);
    const [totalTarif, setTotalTarif] = useState(0);

    useEffect(() => {
        const lastItem = deskripsiSeverity[deskripsiSeverity.length - 1];
        if (lastItem && lastItem.deskripsi && lastItem.severity) {
            setDeskripsiSeverity([...deskripsiSeverity, { deskripsi: '', severity: '' }]);
        }
    }, [deskripsiSeverity]);

    const handleRemoveRow = (index) => {
        const newDeskripsiSeverity = deskripsiSeverity.filter((_, i) => i !== index);
        setDeskripsiSeverity(newDeskripsiSeverity);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedDeskripsiSeverity = [...deskripsiSeverity];
        updatedDeskripsiSeverity[index] = { ...updatedDeskripsiSeverity[index], [name]: value };
        setDeskripsiSeverity(updatedDeskripsiSeverity);
    };

    const handleReset = () => {
        setSearchRs('');
        setSelectedKelasRawat('');
        setDeskripsiSeverity([{ deskripsi: '', severity: '' }]);
        setResults([]);
        setTotalTarif(0);
    };

    const formatCurrency = (value) => {
        if (value === '-') {
            return value;
        }
        return Number(value).toLocaleString('id-ID');
    };

    const handleSuggestionsFetchRequested = ({ value }) => {
        if (value.length >= 2) {
            axiosClient.get('/search', { params: { query: value } })
                .then(response => {
                    setSuggestions(response.data);
                })
                .catch(error => {
                    console.error('Error fetching hospital data:', error);
                });
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = suggestion => suggestion.rumah_sakit;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.rumah_sakit}
        </div>
    );

    const handleSubmit = () => {
        const deskripsiList = [];
        const severityList = [];
        
        deskripsiSeverity.forEach(item => {
            if (item.deskripsi) deskripsiList.push(item.deskripsi);
            if (item.severity) severityList.push(item.severity);
        });

        const combinedList = [];
        for (let i = 0; i < deskripsiList.length; i++) {
            combinedList.push(deskripsiList[i]);
            if (i < severityList.length) combinedList.push(severityList[i]);
        }

        axiosClient.get('/simulation', {
            params: {
                rumah_sakit: searchRs,
                deskripsi: combinedList
            }
        })
        .then(response => {
            const data = response.data;
            setResults(data);

            const total = data.reduce((sum, item) => {
                switch (selectedKelasRawat) {
                    case '1':
                        return sum + (parseFloat(item.tarif_1) || 0);
                    case '2':
                        return sum + (parseFloat(item.tarif_2) || 0);
                    case '3':
                        return sum + (parseFloat(item.tarif_3) || 0);
                    default:
                        return sum;
                }
            }, 0);
            setTotalTarif(total);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className='child-page'>
            <header>
                <h1>Simulasi Tarif Rawat Inap</h1>
            </header>
            <div>
                <div className='input-group'>
                    <h4>Rumah Sakit</h4>
                    <div className="search-container-1" style={{ position: 'relative' }}>
                        <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                            onSuggestionsClearRequested={handleSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={{
                                placeholder: 'Nama Rumah Sakit',
                                value: searchRs,
                                onChange: (_, { newValue }) => setSearchRs(newValue)
                            }}
                            theme={{
                                suggestionsContainer: 'suggestions-container'
                            }}
                        />
                    </div>
                    <div className='search-container'>
                        <select value={selectedKelasRawat} onChange={(e) => setSelectedKelasRawat(e.target.value)}>
                            <option value="">Kelas Rawat</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <h4>Diagnosa Penyakit</h4>
                    {deskripsiSeverity.map((item, index) => (
                        <div key={index} >
                            <div className="search-container">
                                <input
                                    type="text"
                                    name="deskripsi"
                                    placeholder="Diagnosa"
                                    value={item.deskripsi}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                                <select
                                    name="severity"
                                    value={item.severity}
                                    onChange={(e) => handleInputChange(index, e)}
                                >
                                    <option value="">Tingkat Keparahan</option>
                                    <option value="ringan">Ringan</option>
                                    <option value="sedang">Sedang</option>
                                    <option value="berat">Berat</option>
                                </select>
                                {deskripsiSeverity.length > 1 && (
                                    <button className='reset' onClick={() => handleRemoveRow(index)}>Hapus</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className='button-container'>
                        <button className='reset' onClick={handleReset}>Reset</button>
                        <button className='search' onClick={handleSubmit}>Cari</button>
                    </div>
                </div>
                {results.length > 0 && (
                    <div className="results">
                        <h2>Hasil Simulasi</h2>
                        <div>
                            <h4>{results[0].rumah_sakit}</h4>
                            <div className='text-group'>
                                <h5>{results[0].pemilik}</h5>
                                <h5>Status: {results[0].status}</h5>
                                <br />
                            </div>
                            <h5></h5>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Deskripsi</th>
                                    {selectedKelasRawat === '3' && <th>Tarif Kelas 3</th>}
                                    {selectedKelasRawat === '2' && <th>Tarif Kelas 2</th>}
                                    {selectedKelasRawat === '1' && <th>Tarif Kelas 1</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.deskripsi}</td>
                                        {selectedKelasRawat === '3' && <td className='center'>Rp. {formatCurrency(item.tarif_3)}</td>}
                                        {selectedKelasRawat === '2' && <td className='center'>Rp. {formatCurrency(item.tarif_2)}</td>}
                                        {selectedKelasRawat === '1' && <td className='center'>Rp. {formatCurrency(item.tarif_1)}</td>}
                                    </tr>
                                ))}
                                <tr>
                                    <td className='center'>
                                        <strong>Total Tarif</strong>
                                    </td>
                                    <td className='center'><strong>Rp. {formatCurrency(totalTarif)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
