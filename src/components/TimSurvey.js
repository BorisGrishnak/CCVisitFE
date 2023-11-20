import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToggleButton, Form, Button } from 'react-bootstrap';
import axios from "axios";
import Header from './Header';
import Select from 'react-select';
import './Style.css';

export default function TimSurvey() {

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const navigate = useNavigate();
    const [tim, setTim] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = () =>{
         axios.get('https://localhost:7286/api/Peminjaman').then(postData => {
      
         // reshaping the array
         const customHeadings = postData.data.map(item=>({
            "idPeminjaman": item.idPeminjaman,
            "idRuangan": item.idRuangan,
            "ticket": item.ticket,
            "namaRuangan": item.namaRuangan,
            "namaPIC": item.namaPIC,
            "email": item.email,
            "noHp": item.noHp,
            "jumlahTamu": item.jumlahTamu,
            "startTime": item.startTime,
            "endTime": item.endTime,
            "keperluan": item.keperluan,
            "status": item.status,
         }))
         setData(customHeadings)
          // console.log(customHeadings);
         })
        }
        fetchData()
      }, [])
    
      const handleSubmit = e => {
        // Prevent the default submit and page reload
        e.preventDefault()
        try {
            navigate('/survey',
            {
                state:{
                  idTim: tim,
                }
            })
        } catch (error) {
          console.log({error});
        }
        
      }

    const handleChange = e => {
        setTim(e)
        console.log(e);
    };

    const ww = data.map((d) => d.idPeminjaman)
    // console.log(ww);
    const options = data.map((d) => (
      { value: '', label: '-- Silahkan Pilih Tim Anda --' },
      { value: d.idPeminjaman, label: ['Peminjaman No: ', d.ticket, ' PIC: ', d.namaPIC] }
    ))
    console.log(tim);

  return (
    <>
    <div className='survey'>
        <Header/>

        <h1 className='text-center mt-3' style={{fontWeight: 700}}>Mohon masukkan nomor tiket atau nama PIC:</h1>

        <div className="text-center">
            <Form id='form' action="" method="post" onSubmit={handleSubmit}>
            <Select
              className="basic-single mt-5 mb-5 w-50 mx-auto text-start"
              classNamePrefix="select"
              onChange={(e) => setTim(e.value)}
              defaultValue={options[0]}
              options={options}
              isClearable={isClearable}
              isSearchable={isSearchable}
              name="color"
              required
            />

                <Button className="BtnBrn" variant='dark' style={{width: "20%", backgroundColor: '#FDCD04', borderRadius: 30, marginInline: 'auto'}} type="submit">
                    <h3 style={{color: 'black', fontWeight: 700, fontFamily: 'inherit'}}>PILIH</h3>
                </Button>
            </Form>
        </div>
        
    </div>
    </>
  );
}
