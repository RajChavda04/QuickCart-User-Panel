import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Axois from 'axios'
import { API_BASE_URL, MEDIA_BASE_URL } from '../config/apiConfig'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"



function Home() {


    const [list, setList] = useState([]);

    useEffect(() => {
        Axois.get(`${API_BASE_URL}/categorylist`)
            .then((response) => {
                setList(response.data);
            });
    });

    const [summary, setSummary] = useState({
        totalProducts: 0,
        totalFeed: 0,
        totalCategories: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalSales: 0,
    });

    useEffect(() => {

        const fetchSummary = () => {
            Axois.get(`${API_BASE_URL}/admin/summary`)
                .then((res) => {
                    setSummary(res.data);
                })
        };

        fetchSummary();
    }, []);

    return (
        <>
            <section className="relative w-full overflow-hidden h-[250px] sm:h-[350px] md:h-[500px] lg:h-[700px]">
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-gray-900/10 to-black/30 z-[1]"></div>
                {/* Hero Image */}
                <img
                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584577/Acer_nxjuvi.jpg"
                    alt="hero"
                    className="absolute  inset-0 w-full h-full object-cover object-center"
                />

                {/* Desktop / Tablet Card */}
                <div className="hidden md:flex absolute top-1/2 right-6 lg:right-16 -translate-y-1/2 w-[320px] lg:w-[450px] p-6 lg:p-10 rounded-2xl flex-col justify-center bg-gray-800/20 backdrop-blur-sm border border-white/20 shadow-2xl">

                    <h4 className="text-red-500 text-sm font-medium lg:text-base uppercase mb-3">
                        Best 2025 Laptop collection
                    </h4>

                    <h2 className="text-4xl text-gray-50 lg:text-5xl font-bold uppercase leading-tight">
                        Super Sale
                        <br />
                        On Laptop
                    </h2>

                    <h5 className="mt-3 ">
                        <span className="mr-2 text-2xl lg:text-xl">From</span>
                        <span className="text-2xl lg:text-3xl text-red-500">  ₹2600.00   </span>
                    </h5>

                    <div className="mt-6  w-fit rounded-md ">
                        <Link to="/Shope" className="inline-block cursor-pointer rr-primary-btn cta-btn font-bold px-6 py-3">
                            View Products
                        </Link>
                    </div>

                </div>

            </section>


            <section className="pt-10 pb-10 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-24 overflow-hidden">

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="flex items-end justify-between mb-8 lg:mb-14">

                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
                                Best for your categories
                            </h2>

                            <p className="mt-3 text-sm sm:text-base">
                                {summary.totalCategories} categories belonging to a total {summary.totalProducts} products
                            </p>
                        </div>

                        {/* Desktop Arrows */}
                        <div className="hidden md:flex gap-3">

                            <button className="category-prev w-12 h-12 rounded-full border flex items-center justify-center text-xl">
                                ←
                            </button>

                            <button className="category-next w-12 h-12 rounded-full border flex items-center justify-center text-xl">
                                →
                            </button>

                        </div>

                    </div>

                    {/* Swiper Carousel */}
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".category-prev",
                            nextEl: ".category-next",
                        }}
                        spaceBetween={16}
                        slidesPerView={2}
                        breakpoints={{
                            480: {
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 5,
                            },
                            1280: {
                                slidesPerView: 6,
                            },
                        }}
                        className="w-full"
                    >

                        {list.map((val, index) => (

                            <SwiperSlide key={index}>

                                <div className="flex flex-col rounded-lg bg-gray-200 hover:bg-red-500 items-center">

                                    {/* Image */}
                                    <div className="w-[110px] mt-3 h-[110px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] overflow-hidden rounded-lg">

                                        <img
                                            src={`${MEDIA_BASE_URL}/${val.category_image}`}
                                            alt={val.category_image}
                                            className="w-full h-full object-cover transition duration-300 hover:scale-110"
                                        />

                                    </div>

                                    {/* Category Name */}
                                    <h3 className="mt-3 mb-2 text-center">

                                        <Link
                                            to="/Shopgrid"
                                            state={{ category_id: val.category_id }}
                                            className="text-sm sm:text-base md:text-lg font-medium"
                                        >
                                            {val.category_name}
                                        </Link>

                                    </h3>

                                </div>

                            </SwiperSlide>

                        ))}

                    </Swiper>

                </div>

            </section>

            <section className="collect-section pb-4 sm:pb-6 lg:pb-8">

                <div className="container px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        {/* Left Card */}
                        <div className="collect-item h-full p-5 sm:p-6 lg:p-6 rounded-2xl overflow-hidden relative">

                            <span className="text-base sm:text-base">20+ Products</span>

                            <h3 className="title text-2xl sm:text-3xl lg:text-3xl mt-2">
                                Popular Products
                            </h3>

                            <p className="mt-2 text-sm sm:text-base">
                                This is most popular products of this month
                            </p>

                            <ul className="collect-list mt-3 space-y-2">

                                <li>
                                    <Link to="/Shope" className="text-sm sm:text-base lg:text-base">
                                        DELL Inspiron Intel Core i5
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/Shope" className="text-sm sm:text-base lg:text-base">
                                        Lenovo LOQ 12th Gen,Intel i5
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/Shope" className="text-sm sm:text-base lg:text-base">
                                        HP ENVY X360 Intel Core i7
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/Shope" className="text-sm sm:text-base lg:text-base">
                                        HP Pavilion Standard Laptop
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/Shope" className="text-sm sm:text-base lg:text-base">
                                        Lenovo Ideapad Flex 5 Gen 7
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        {/* Right Side */}
                        <div className="collect-items flex flex-col gap-4">

                            {/* Card 1 */}
                            <div className="collect-item item-1 relative overflow-hidden rounded-2xl p-5 sm:p-6 lg:p-6 min-h-[220px] sm:min-h-[250px] lg:min-h-[240px]">

                                <span className="text-base sm:text-base">15+ Products</span>

                                <h3 className="title text-2xl sm:text-3xl lg:text-3xl mt-2">
                                    Top Graphics card
                                </h3>

                                <ul className="collect-list mt-3 space-y-2">

                                    <li><Link to="/Shope" className="text-sm sm:text-base lg:text-base">ASUS</Link></li>

                                    <li><Link to="/Shope" className="text-sm sm:text-base lg:text-base">MSI</Link></li>

                                    <li><Link to="/Shope" className="text-sm sm:text-base lg:text-base">ASRock</Link></li>

                                    <li><Link to="/Shope" className="text-sm sm:text-base lg:text-base">Gigabyte</Link></li>

                                </ul>

                                <div className="men absolute bottom-0 right-0 w-[100px] sm:w-[130px] lg:w-[160px]">
                                    <img
                                        src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584812/gp_aictxs.png"
                                        alt="discount"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                            </div>

                            {/* Card 2 */}
                            <div className="collect-item item-2 relative overflow-hidden rounded-2xl p-5 sm:p-6 lg:p-6 min-h-[220px] sm:min-h-[250px] lg:min-h-[240px]">

                                <span className="text-base sm:text-base">10+ Products</span>

                                <h3 className="title text-2xl sm:text-3xl lg:text-3xl mt-2">
                                    Best Laptop
                                </h3>

                                <ul className="collect-list mt-3 space-y-2">

                                    <li><Link to="/Shope" className="text-sm sm:text-base lg:text-base">HP</Link></li>

                                    <li><Link to="/Shope" className="text-sm sm:text-base lg:text-base">Lenovo</Link></li>

                                    <li><Link to="/Shope" className="text-sm sm:text-base lg:text-base">Victus</Link></li>

                                    <li><Link to="/Shope" className="text-sm sm:text-base lg:text-base">Samsung</Link></li>

                                </ul>

                                <div className="men absolute bottom-0 right-0 w-[100px] sm:w-[130px] lg:w-[160px]">
                                    <img
                                        src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584855/lp_s4yqn5.png"
                                        alt="discount"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            <section className="cta-section  pt-100 pb-100" data-background="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778584978/bg1_wdpwuu.jpg">
                <div className="overlay"></div>
                <div className="container">
                    <div className="cta-wrap text-center">
                        <span>High Performance Graphics Card </span>
                        <h2 className="title">-15% Off Discount All Here</h2>
                        <Link to="/Shope" className="rr-primary-btn cta-btn">View Products</Link>
                    </div>
                </div>
            </section>


            <div className="sponsor-section pt-10 sm:pt-14 lg:pt-24">

                <div className="container px-8 sm:px-6 lg:px-20">

                    <div className="row sponsor-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                        <div className="sponsor-item bd-right bd-bottom flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585418/hp_ycnp6z.jpg"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item bd-right bd-bottom flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585450/lenovo_ps7qfk.jpg"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item bd-right bd-bottom flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585476/victus_zoyqkb.jpg"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item bd-right bd-bottom flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585501/dell_nm4fx6.jpg"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item bd-bottom flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585520/asus_rngfwc.jpg"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item bd-right flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585538/intel_xzgbqy.jpg"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item bd-right flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585561/ryzen_ddjtpb.png"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item bd-right flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585582/nvidia_quk4uz.png"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item bd-right flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585603/sam_zyzopv.jpg"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="sponsor-item flex items-center justify-center p-4 sm:p-6 min-h-[110px] sm:min-h-[140px]">
                            <Link to="/">
                                <img
                                    src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1778585623/as_bt0rdw.png"
                                    alt="img"
                                    className="w-[50px] sm:w-60px] lg:w-[80px] object-contain"
                                />
                            </Link>
                        </div>

                    </div>

                </div>

            </div>


            <section className="deal-section pt-20 ">
                <div className="container">
                    <div className="row deal-wrap align-items-center">
                        <div className="shape"><img src="assets/img/shapes/deal-shape.png" alt="shape" /></div>
                        <div className="col-xl-5 col-lg-12">
                            <div className="deal-content">
                                <div className="section-heading mb-0">
                                    <h2 className="section-title">Deal Of the days</h2>
                                    <p>Elegant pink origami design three type of dimensional view and decoration co Great for adding a decorative...</p>
                                </div>
                                <div className="deal-info">
                                    <div className="icon">
                                        <img src="assets/img/icon/deal-icon.png" alt="icon" />
                                    </div>
                                    <div className="content">
                                        <p>Limited Time offer. THe Deal will expire  one august 18, 2024 </p>
                                    </div>
                                </div>
                                <Link to="/Shope" className="rr-primary-btn deal-btn">View All Products </Link>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12">
                            <div className="row gy-md-0 gy-4">
                                <div className="col-md-6  ">
                                    <div className="shop-item deal-shop  ">
                                        <div className=''>
                                            <div className="shop-thumb">
                                                <div className="overlay"></div>
                                                <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1779965932/lenovo1_wcdavm.jpg" alt="shop" />
                                                <span className="sale">New</span>
                                  
                                            </div>
                                            <div className="shop-content">
                                                <span className="category">Laptop</span>
                                                <h3 className="title"><Link to="/Shope">Lenovo LOQ 12th Gen,Intel i5</Link></h3>
                                                <div className="review-wrap">
                                                    <ul className="review">
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <span>({summary.totalFeed} Reviews)</span>
                                                </div>
                                                <span className="price"> <span className="offer">₹2600.00</span>₹63491</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6  ">
                                    <div className="shop-item deal-shop  ">
                                        <div className=''>
                                            <div className="shop-thumb">
                                                <div className="overlay"></div>
                                                <img src="https://res.cloudinary.com/dmuedtbcs/image/upload/v1779967099/1741444503198-dell1_lmrmox.jpg" alt="shop" />
                                                <span className="sale">New</span>
                
                                            </div>
                                            <div className="shop-content">
                                                <span className="category">Laptop</span>
                                                <h3 className="title"><Link to="/Shope">DELL Inspiron Intel Core i5</Link></h3>
                                                <div className="review-wrap">
                                                    <ul className="review">
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                        <li><i className="fa-solid fa-star"></i></li>
                                                    </ul>
                                                    <span>({summary.totalFeed} Reviews)</span>
                                                </div>
                                                <span className="price"> <span className="offer">₹2600.00</span>₹58165</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;
