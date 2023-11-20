import React, { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToggleButton, Form, Button } from 'react-bootstrap';
import Header from './Header';
import './Style.css';
import StarRating from "./StarRating";
import Rate from "./Rate";
import Swal from "sweetalert2";
import axios from "axios";
import { IoMdStar } from "react-icons/io";

export default function Survey() {
  
    const [rating, setRating] = useState(0);
    const [kenyamanan, setKenyamanan] = useState(0);
    const [fungsional, setFungsional] = useState(0);
    const [saran, setSaran] = useState('-');
    const [hover, setHover] = useState(null);

    const location = useLocation();

    const navigate = useNavigate();

    async function handleClick(type, tag) {
      switch (type) {
        case 'kenyamanan':
          setKenyamanan(tag);
          break;
        case 'fungsional':
          setFungsional(tag);
          break;
      }
      // console.log({type, tag});
    }

    function onAlert() {
      Swal.fire({  
        title: 'Terima Kasih', 
        text: 'Masukan anda sangat berarti bagi kami',
        icon: "success",
        confirmButtonText: "OK",
      }).then(function() {
        window.location.href = '/';  
      });  
    }

    const handleSubmit = e => {
      // Prevent the default submit and page reload
      e.preventDefault()
      try {
        axios.post(`https://localhost:7286/api/Review/${location.state.idTim}`, {
          "idReview": 0,
          "idPeminjaman": location.state.idTim,
          "kenyamanan": kenyamanan,
          "fungsional": fungsional,
          "rating": rating,
          "saran": saran
      });
      } catch (error) {
        if (location.state == null) {
          Swal.fire({  
            title: 'Terjadi Kesalahan',
            text: 'Mohon untuk memilih tim anda.',
            icon: "error",
            confirmButtonText: "OK",
          }).then(function() {
            window.location.href = '/timsurvey';  
          }); 
        }
      }
      
    }

  return (
    <>
    <div className='survey'>
        <Header/>
        
        <Form id='form' action="" method="post" onSubmit={handleSubmit}>
        <h1 className='text-center mt-3' style={{fontWeight: 700}}>Kami menghargai ulasan anda!</h1>
        <h4 className='mt-5 ms-5'>Berikan ulasan anda tentang website kami berdasarkan aspek berikut</h4>
        <div className='ms-5 me-5'>
            <table className='table'>
                <thead style={{borderColor: '#FDCD04'}}>
                    <tr>
                        <th colSpan={3}></th>
                        <th colSpan={3}>Sangat buruk</th>
                        <th colSpan={2}></th>
                        <th>Luar biasa!</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3}>Kenyamanan</td>
                        <td><input style={{display: "none"}} type="radio" value={1} name="kenyamanan" /> 
                            <Button id={`${kenyamanan === 1 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('kenyamanan', 1)}>
                              1
                            </Button>
                        </td>
                        <td><input style={{display: "none"}} type="radio" value={2} name="kenyamanan" /> 
                            <Button id={`${kenyamanan === 2 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('kenyamanan', 2)}>
                              2
                            </Button>
                        </td>
                        <td><input style={{display: "none"}} type="radio" value={3} name="kenyamanan" /> 
                            <Button id={`${kenyamanan === 3 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('kenyamanan', 3)}>
                              3
                            </Button></td>
                        <td colSpan={2}><input style={{display: "none"}} type="radio" value={4} name="kenyamanan" /> 
                            <Button id={`${kenyamanan === 4 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('kenyamanan', 4)}>
                              4
                            </Button></td>
                        <td><input style={{display: "none"}} type="radio" value={5} name="kenyamanan" /> 
                            <Button id={`${kenyamanan === 5 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('kenyamanan', 5)}>
                              5
                            </Button></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={3}>Fungsional</td>
                        <td><input style={{display: "none"}} type="radio" value={1} name="fungsional" /> 
                            <Button id={`${fungsional === 1 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('fungsional', 1)}>
                              1
                            </Button></td>
                        <td><input style={{display: "none"}} type="radio" value={2} name="fungsional" /> 
                            <Button id={`${fungsional === 2 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('fungsional', 2)}>
                              2
                            </Button></td>
                        <td><input style={{display: "none"}} type="radio" value={3} name="fungsional" /> 
                            <Button id={`${fungsional === 3 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('fungsional', 3)}>
                              3
                            </Button></td>
                        <td colSpan={2}><input style={{display: "none"}} type="radio" value={4} name="fungsional" /> 
                            <Button id={`${fungsional === 4 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('fungsional', 4)}>
                              4
                            </Button></td>
                        <td><input style={{display: "none"}} type="radio" value={5} name="fungsional" /> 
                            <Button id={`${fungsional === 5 ? 'bg-yellow' : 'btnRate'}`} type="button" onClick={() => handleClick('fungsional', 5)}>
                              5
                            </Button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <h4 className='mt-5 ms-5'>Seberapa banyak nilai yang akan anda berikan secara keseluruhan?</h4>
        <div className='ms-5 me-5 mt-5 text-center'>
        {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              key={i}
              style={{display: "none"}}
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <IoMdStar
              key={star}
              className="star mx-5"
              size={100}
              color={ratingValue <= (hover || rating) ? "#FDCD04" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
        </div>
        
        <h4 className='mt-5 ms-5'>Berikan kami masukkan agar website ini berkembang lebih baik lagi!</h4>
        <div className='ms-5 me-5 mt-5 text-center'>
            <Form.Control
              style={{paddingBottom: 86}}
              type="text"
              placeholder="Kritik dan saran anda sangat membantu"
              id='formgroup'
              onChange={e => setSaran(e.target.value)}
            />
        </div>

        <div className='button text-center mb-5' style={{marginTop: 35}}>
          {/* <Link to="/"> */}
              <Button className="ms-5 BtnBrn" variant='dark' style={{width: "20%", backgroundColor: '#FDCD04', borderRadius: 30}} type="submit" onClick={onAlert}>
                  <h3 style={{color: 'black', fontWeight: 700, fontFamily: 'inherit'}}>SUBMIT</h3>
              </Button>
          {/* </Link> */}
        </div>
        </Form>
    </div>
    </>
  );
}
