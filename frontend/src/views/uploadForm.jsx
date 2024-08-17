import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import '../App.css';

export default function UploadForm() {
    const [file, setFile] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const url = '/upload-data';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axiosClient.post(url, formData, config)
            .then((response) => {
                console.log(response.data);
                setIsError(false);
                setLoading(false);
                setShowDialog(true);
            })
            .catch((error) => {
                console.error('An error occurred while uploading:', error);
                setIsError(true);
                setLoading(false);
                setShowDialog(true);
            });
    }

    function handleOk() {
        setShowDialog(false);
        navigate('/search');    
    }

    function handleCancel() {
        setShowDialog(false);
        setFile(null);
    }

    return (
        <div className="child-page">
            <header>
                <h1>Upload File</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
                <button type="submit">Upload</button>
            </form>
            {loading &&
                <p className="center">
                    Loading...
                </p>
            }
            {showDialog && !isError && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h4>File berhasil diupload</h4>
                        <button onClick={handleOk}>OK</button>
                    </div>
                </div>
            )}
            {showDialog && isError && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h4>File gagal diupload</h4>
                        <button onClick={handleCancel}>OK</button>
                    </div>
                </div>  
            )}
        </div>
    );
}
