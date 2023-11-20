import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Carousel } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import UNTR from '../assets/untr.png';
import B2 from '../assets/b2.jpg'
import './Style.css';
import Chart from './Chart';
import CC1 from '../assets/cc1.jpg';
import CC2 from '../assets/cc2.jpg';
import CC3 from '../assets/cc3.jpg';
import CC4 from '../assets/cc4.jpg';
import CC5 from '../assets/cc5.jpg';
import CC6 from '../assets/cc6.jpg';
import Scroll from './Scroll';

export default function Beranda() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };

  return (
    <>
    <Scroll />
    <div className="B1" style={{backgroundImage: `url(${UNTR})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                height: 800
                            }}>  
    <Header />

        <div className='container'>
          <div className='row' style={{marginTop: 300}}>
            <div className='Tx1 text-center'>
                <h1 className='TextBrn' style={{color: `white`, fontWeight: 320, fontSize: 66}}>Selamat datang di UT Command Center </h1>
            </div>
            <div className='button text-center' style={{marginTop: 55}}>
                <Link to="/registrasi">
                    <Button className="ms-5 BtnBrn" variant='dark' style={{width: "20%", backgroundColor: '#FDCD04'}} type="button">
                        <h3 style={{color: 'black', fontWeight: 400, fontFamily: 'inherit'}}>REGISTRASI</h3>
                    </Button>
                </Link>
                <Link to="/jadwal">
                    <Button className="ms-5 BtnBrn" variant='dark' style={{width: "20%", backgroundColor: '#FDCD04'}} type="button">
                        <h3 style={{color: 'black', fontWeight: 400, fontFamily: 'inherit'}}>JADWAL</h3>
                    </Button>
                </Link>
                <Link to="/timsurvey">
                    <Button className="ms-5 BtnBrn" variant='dark' style={{width: "20%", backgroundColor: '#FDCD04'}} type="button">
                        <h3 style={{color: 'black', fontWeight: 400, fontFamily: 'inherit'}}>REVIEW</h3>
                    </Button>
                </Link>
            </div>
          </div>
        </div>
    </div>

    <div className='B2' id='bg2' style={{backgroundSize: 700,
                                backgroundRepeat: "no-repeat"
    }}>
        <div className='container pt-5'>
            <div className='row'>
                <div className='col-6'>
                    
                </div>
                <div className='col-6'>
                    <h1 style={{fontWeight: 700}}>UT COMMAND CENTER</h1>
                    <p className='mt-4' style={{fontSize: 20, fontWeight: 400}}>
                        UT Command Center merupakan fasilitas yang dikembangkan sebagai 
                        pusat kendali operasional untuk memastikan dan meningkatkan kepuasan 
                        pelanggan atas produk dan layanan UT. Fitur yang sudah dikembangkan 
                        dalam UT Command Center adalah Parts Order Tracking, Customer 
                        Equipment Monitoring dan Customer Handling Management.
                    </p>

                    <p className='mt-4' style={{fontSize: 20, fontWeight: 400}}>
                        Sejalan dengan strategi 3D (Differentiation, Diversification and 
                        Digitalization), UT Command Center merupakan inisiatif strategis untuk 
                        memperkuat diferensiasi terhadap para kompetitor, di tengah kondisi 
                        persaingan yang dinamis dan perkembangan teknologi yang sangat pesat.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div className='B3'>
        <div className='container' style={{marginTop: 120}}>

            <div className='row' style={{marginTop: 100}}>
                <div className='col-6'>
                <Card id='Carhed' style={{width: 400, marginInlineStart: 100}}>
                    <Card.Body>
                        <h1>Latar Belakang</h1>
                    </Card.Body>
                </Card>

                <Card id='cardb3' className='me-5'>
                    <Card.Body className='cardbo3'>
                        <ul id='ulca' style={{fontSize: 26}}>
                            <li>Peningkatan kepuasan pelanggan atas layanan UT product support</li>
                            <li className='mt-5'>Mendorong tercapainya operation excellence pada operational UT</li>
                            <li className='mt-5'>Memberikan added value kepada pelanggan dengan adanya UT Command Center</li>
                        </ul>
                    </Card.Body>
                </Card>
                </div>
                <div className='col-6'>
                <Card id='Carhed' style={{width: 400, marginInlineStart: 100}}>
                    <Card.Body>
                        <h1>TUJUAN</h1>
                    </Card.Body>
                </Card>

                <Card id='cardb3' className='me-5'>
                    <Card.Body className='cardbo3'>
                        <ul id='ulca' style={{fontSize: 26}}>
                            <li>Memberikan dukungan maksimal terhadap aktivitas 
                                operasional di cabang dan site dengan cara 
                                mengidentifikasi dan menyelesaikan masalah dengan cepat dan tepat
                            </li>
                            <li className='mt-5'>Memberikan rekomendasi perbaikan berkelanjutan atas proses bisnis yang ada</li>
                        </ul>
                    </Card.Body>
                </Card>
                </div>
            </div>

            <div className='row'>
                <Card id='Carhedcen' className='mx-auto' style={{width: 400}}>
                    <Card.Body>
                        <h1>VISI & MISI</h1>
                    </Card.Body>
                </Card>

                <Card id='cardb4'>
                    <Card.Body>
                        <h3 id='ctex' className='text-center'>
                            United Tractors Command Center sebagai lokomotif dari operation UT untuk mencapai satu tujuan yaitu meningkatkan kepuasan pelanggan
                        </h3>
                    </Card.Body>
                </Card>
            </div>

            <div className='row'>
                <Card id='Carhedcen' className='mx-auto' style={{width: 400}}>
                    <Card.Body>
                        <h1>MILESTONE</h1>
                    </Card.Body>
                </Card>

                <Card id='cardb4'>
                    <Card.Body>
                        <div id='blockchart'>
                            <Chart />
                        </div>
                        <div className='row'>
                            <div className='col-2' id='chadesc1'>
                                <h6>United Tractors Command Center dibuat</h6>
                            </div>
                            <div className='col-2' id='chadesc2'>
                                <h6>Menguatkan pondasi operasi dari Command Center</h6>
                            </div>
                            <div className='col-2' id='chadesc3'>
                                <h6>Memperkuat operasi Command Center untuk mencakup banyak klien dan memuaskannya</h6>
                            </div>
                            <div className='col-2' id='chadesc4'>
                                <h6>Fokus pada impact dan merancang mode kerja baru</h6>
                            </div>
                            <div className='col-2' id='chadesc5'>
                                <h6>Menaikan performa dan impact lewat LOCOMOTIVE</h6>
                            </div>
                            <div className='col-2'></div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className='row' id='galeri'>
                <Carousel id='carousel' data-bs-theme="dark" activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item>
                    <img id='caroimg' src={CC1} text="First slide" />
                    <img id='caroimg' src={CC2} text="Second slide" />
                    <img id='caroimg' src={CC3} text="Third slide" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img id='caroimg' src={CC4} text="Second slide" />
                    <img id='caroimg' src={CC5} text="Second slide" />
                    <img id='caroimg' src={CC6} text="Second slide" />
                  </Carousel.Item>
                </Carousel>
            </div>

        </div>

    <div className='footer' style={{backgroundColor: 'black'}}>
        <Footer />
    </div>

    </div>
    </>
  );
}
