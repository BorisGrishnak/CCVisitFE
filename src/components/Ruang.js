import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import Header from './Header';
import { AiFillCheckCircle } from 'react-icons/ai'
import { AiFillClockCircle } from 'react-icons/ai'
import Swal from "sweetalert2";
import axios from 'axios';
import moment from 'moment';

export default function Tamu() {

  const [data, setData] = useState([])

  const [peminjaman, setPeminjaman] = useState([]);

  const [ruang, setRuang] = useState(1);

  const [keperluan, setKeperluan] = useState('Meeting');

  const [detailKeperluan, setDetailKeperluan] = useState('');

  const [fas, setFas] = useState();

  const fa = () => {
    if (fas === 1) {
      return <span>20 - 24 Orang</span>
    }
    if (fas === 2) {
      return <span>6 - 8 Orang</span>
    }
    if (fas === 3) {
      return <span>14 - 15 Orang</span>
    }
    if (fas === 4) {
      return <span>5 - 6 Orang</span>
    }
    else{
      return <span><i>Silahkan memilih ruang terlebih dahulu</i></span>
    }
  };

  const location = useLocation();
  // console.log(location.state);

  function handleClick(){
    Swal.fire({  
      title: 'Success',  
      type: 'success',  
      text: 'Your work has been saved.',
      icon: "success",
      confirmButtonText: "OK",
    }).then(function() {
      window.location.href = '/';  
    }); 
}

// console.log(ruang);
useEffect(() => {
  const fetchData = () =>{
   axios.get('https://localhost:7286/api/Ruangan').then(postData => {

   // reshaping the array
   const customHeadings = postData.data.map(item=>({
     "idRuangan": item.idRuangan,
     "namaRuangan": item.namaRuangan,
     "kapasitas": item.kapasitas,
     "availability": item.availability,
   }))
   setData(customHeadings)
    // console.log(customHeadings);
   })
  }
  fetchData()
}, [])  

useEffect(() => {
  const fetchData = () =>{
   axios.get('https://localhost:7286/api/Peminjaman').then(postPm => {

   // reshaping the array
   const pinjam = postPm.data.map(item=>({
    "idPeminjaman": item.idPeminjaman,
    "idRuangan": item.idRuangan,
    "namaPIC": item.namaPIC,
    "email": item.email,
    "noHp": item.noHp,
    "jumlahTamu": item.jumlahTamu,
    "status": item.status,
    "startTime": item.startTime,
    "endTime": item.endTime,
    "keperluan": item.keperluan,
    "detailKeperluan": item.detailKeperluan
   }))
   setPeminjaman(pinjam)
    // console.log(pinjam);
   })
  }
  fetchData()
}, [])

const [startTime, setStartTime] = useState('');
const [endTime, setEndTime] = useState('');
const [jumlahTamu, setJumlahTamu] = useState(1);
const status = 'On Request';

const today = moment();
const endOfDay = today.endOf('day').format('yyyy-MM-DDTh:mm');
// console.log(endOfDay);

const handleSubmit = e => {
  // Prevent the default submit and page reload
  e.preventDefault()
  try {
  axios.post('https://localhost:7286/api/Peminjaman', {
    idRuangan: ruang,
    ticket: "",
    namaPIC: location.state.namaPIC,
    email: location.state.email,
    noHp: location.state.noHp,
    jumlahTamu: jumlahTamu,
    startTime: startTime,
    endTime: endTime,
    keperluan: keperluan,
    detailKeperluan: detailKeperluan,
    status: status
  });
  } catch (error) {
    if (location.state == null) {
      Swal.fire({  
        title: 'Terjadi Kesalahan',
        text: 'Mohon untuk mengisi data PIC.',
        icon: "error",
        confirmButtonText: "OK",
      }).then(function() {
        window.location.href = '/registrasi';  
      }); 
    }
    // console.log({error});
  }
  
}

const min = 1;
const [max, setMax] = useState(1);

const handleMinMax = event => {
  const value = Math.max(min, Math.min(max, Number(event.target.value)));
  setJumlahTamu(value)
}

const   woo = data.map((dt) => dt.availability);
// console.log(woo[0]);
const [available, setAvailable] = useState(2);

const handleChange = event => {
  if (event.target.value == 1) {
    setRuang(event.target.value);
    setMax(24)
    setFas(1)
    setAvailable(woo[0])
  } if (event.target.value == 2) {
    setRuang(event.target.value);
    setMax(8)
    setFas(2)
    setAvailable(woo[1])
  } if (event.target.value == 3) {
    setRuang(event.target.value);
    setMax(15)
    setFas(3)
    setAvailable(woo[2])
  } if (event.target.value == 4) {
    setRuang(event.target.value);
    setMax(6)
    setFas(4)
    setAvailable(woo[3])
  }
  // console.log(event.target.value);
};

const handleKeperluan = event => {
  // console.log(event.target.value);
  setKeperluan(event.target.value);
};

const handleTime = event => {
  // console.log(moment(event.target.value).format('yyyy-MM-D'));
  setStartTime(event.target.value)

  const isFound = peminjaman.some(pm => {
    if (pm.idRuangan == ruang && moment(event.target.value).format('yyyy-MM-D') == moment(pm.startTime).format('yyyy-MM-D') && pm.status !== "Approved" ) {
      return true;
    } else {
      return false;
    }
  })

  if (isFound) {
    console.log('✅');
    setAvailable(false)
  } else {
    console.log('⛔️');
    setAvailable(true)
  }
}

  return (
    <>
    <div className='registrasi'>
    <Header/>
        <div className='container'>
        <Card id='cardreg' className='mt-3 mb-3'>
          <Card.Body>
            <h2 className='text-center' id='foreg'>PILIH RUANG</h2>
                
            <Form id='form' action="" method="post" onSubmit={handleSubmit}>
                <Form.Group md="4" controlId="validationCustom01">
                    <div className='row'>
                        <div className='col-6'>
                            <Form.Label>Ruangan</Form.Label>
                            <Form.Select id='formgroup' onChange={handleChange} name="ruang" aria-label="Default select example" required>
                              <option value={0}>-- Pilih Ruangan --</option>
                              <option value={1}>Ruang Collaboration</option>
                              <option value={2}>Ruang Synergy</option>
                              <option value={3}>Ruang Harmonize</option>
                              <option value={4}>Ruang Inspiring</option>
                            </Form.Select>
                        </div>
                        <div className='col-6'>
                            <div style={{marginTop: 30, marginInlineStart: 50}}>
                                {(function() {
                                  if (available === true) {
                                    return <h3><AiFillCheckCircle /> TERSEDIA</h3>;
                                  } if (available === false) {
                                    return <h3><AiFillClockCircle /> BOOKED</h3>;
                                  }
                                })()}
                            </div>
                        </div>
                    </div>
                </Form.Group>
                
                <div className='row'>
                  <div className='col-9 mt-4'>
                    <h6>Kapasitas:</h6>
                    <ul>{fa()}</ul>
                    <Form.Label className='mt-2'>Jumlah Tamu</Form.Label>
                    <div>
                    <Form.Control
                      style={{width: 100, display: 'inline-block'}}
                      required
                      type="number"
                      placeholder="1"
                      value={jumlahTamu}
                      id='formgroup'
                      name="jumlahTamu"
                      onChange={handleMinMax}
                    />
                    </div>
                  </div>
                  <div className='col-3 text-end mt-4'>
                    <Form.Label>Keperluan</Form.Label>
                    <Form.Select id='formgroup' onChange={handleKeperluan} name="ruang" aria-label="Default select example" required>
                      <option value={'Meeting'}>Meeting</option>
                      <option value={'Visit'}>Visit</option>
                    </Form.Select>
                    <Form.Label className='mt-2'>Detail Keperluan</Form.Label>
                    <div>
                    <Form.Control
                      style={{width: 225, display: 'inline-block'}}
                      required
                      type="text"
                      placeholder="Rincian keperluan anda"
                      value={detailKeperluan}
                      id='formgroup'
                      name="detailKeperluan"
                      onChange={e => setDetailKeperluan(e.target.value)}
                    />
                    </div>
                  </div>
                </div>

                <Form.Group md="4" className='mt-4'>
                  <h6><b>Waktu Berkunjung</b></h6>
                  <div className='row'>
                    <div className='col-4'>
                      <Form.Label>Mulai</Form.Label>
                      {/* <Flatpickr
                        required
                        options={{ time_24hr: true, enableTime: true, dateFormat: "Y-M-d H:i", }}
                        id='formgroup'
                        name="startTime"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                      /> */}
                      <Form.Control
                        required
                        type="datetime-local"
                        placeholder=""
                        id='formgroup'
                        name="startTime"
                        value={startTime}
                        min={endOfDay}
                        onChange={handleTime}
                        />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </div>
                    <div className='col-4'>
                    </div>
                    <div className='col-4'>
                      <Form.Label>Selesai</Form.Label>
                      {/* <Flatpickr
                        required
                        options={{ time_24hr: true, enableTime: true, }}
                        id='formgroup'
                        name="endTime"
                        value={endTime}
                        onChange={setEndTime}
                      /> */}
                      <Form.Control
                        required
                        type="datetime-local"
                        placeholder=""
                        id='formgroup'
                        name="endTime"
                        value={endTime}
                        min={startTime}
                        onChange={e => setEndTime(e.target.value)}
                        />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </div>
                  </div>
                </Form.Group>

                <div className='button text-center' style={{marginTop: 35}}>
                    {(function() {
                      if (available === true) {
                        return <Button className="ms-5 BtnBrn" variant='dark' style={{width: "20%", backgroundColor: '#FDCD04', borderRadius: 30}} type="submit" onClick={handleClick}>
                                  <h3 style={{color: 'black', fontWeight: 700, fontFamily: 'inherit'}}>SUBMIT</h3>
                              </Button>
                      } else {
                        return <Button className="ms-5 BtnBrn" variant='dark' style={{width: "20%", backgroundColor: '#FDCD04', borderRadius: 30}} type="button" onClick={handleClick} disabled>
                                    <h3 style={{color: 'black', fontWeight: 700, fontFamily: 'inherit'}}>SUBMIT</h3>
                                </Button>
                      }
                    })()}
                      
                {/* <SweetAlert2 {...swalProps}>
                </SweetAlert2> */}
                </div>
                
            </Form>

            </Card.Body>
        </Card>
        </div>

        <div>&nbsp;</div>

    </div>
    </>
  );
}
