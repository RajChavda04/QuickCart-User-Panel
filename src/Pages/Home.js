import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Axois from 'axios'
import { API_BASE_URL } from '../config/apiConfig'





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

            <section className="hero-section">
                <div className="overlay"></div>
                <div className="hero-images">
                    <div className="hero-people"><img src="assets/img/images/Acer.jpg" alt="img" style={{ objectFit: 'cover', height: '100vh', width: '100vw' }} /></div>
                    <div className="hero-shape"><img src="assets/img/shapes/hero-shape-1.png" alt="shape" /></div>
                    <div className="hero-shape-2"><img src="assets/img/shapes/hero-shape-2.png" alt="shape" /></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8"></div>
                        <div className="col-xl-4 col-lg-12">
                            <div className="hero-content" >
                                <div className="homedata">
                                    <h4 className="sub-title">Best 2025 Laptop collection</h4>
                                    <h2 className="title">Super Sale on Laptop</h2>
                                    <h5 className="price"><span>From</span>₹2600.00</h5>
                                    <Link to="/Shope" className="rr-primary-btn">View Products</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

          
            <section class="category-section pt-100 pb-100"  >
                <div class="container">
                    <div class="category-top heading-space space-border">
                        <div class="section-heading mb-0">
                            <h2 class="section-title">Best for your categories</h2>
                            <p>{summary.totalCategories} categories belonging to a total {summary.totalProducts} products</p>
                        </div>

                        {/* <div class="swiper-arrow">
                            <div class="swiper-nav swiper-next"><i class="fa-regular fa-arrow-left"></i></div>
                            <div class="swiper-nav swiper-prev"><i class="fa-regular fa-arrow-right"></i></div>
                        </div> */}
                    </div>
                    
                    <div class="category-carousel swiper" >
                   
                        <div class="swiper-wrapper" >
                        {/* class="swiper-slide" */}
                            <div   style={{
                            
                              width: "100vw",
                              height: "220px",
                              display: "flex",
                              gap: "20px", 
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "flex-start" ,}}>
             
                            {list.map((val, index) => (
                                    <div class="category-item"  >
                                        <div class="category-img"  style={{
                                  width: "160px",
                                  height: "160px",
                                  display: "flex",
                               
                                
                                  alignItems: "center",
                                  justifyContent: "flex-start" ,
                                  overflow: "hidden",
                                  borderRadius: "8px",}}>
                                            {/* <img src="assets/img/images/img10.jpg" alt="category"/> */}
                                            <img
                                                src={`http://localhost:1337/${(val.category_image)}`}
                                                alt={val.category_image}
                                                />
                                        </div>
                                        <h3 class="title"  ><Link to="/Shopgrid"  state={{ category_id: val.category_id }}>{val.category_name}</Link></h3>
                                    </div>
                               
                            ))}
                           
                            </div>

                        </div>
                     
                    </div>
                      
                </div>
            </section>



            <section className="collect-section pb-100">
                <div className="container">
                    <div className="row gy-lg-0 gy-4">
                        <div className="col-lg-6">
                            <div className="collect-item">
                                <span>20+ Products</span>
                                <h3 className="title">Popular Products</h3>
                                <p>This is most popular products of this month</p>
                                <ul className="collect-list">
                                    <li><Link to="/Shope">DELL Inspiron Intel Core i5</Link></li>
                                    <li><Link to="/Shope">Lenovo LOQ 12th Gen,Intel i5</Link></li>
                                    <li><Link to="/Shope">HP ENVY X360 Intel Core i7</Link></li>
                                    <li><Link to="/Shope">HP Pavilion Standard Laptop</Link></li>
                                    <li><Link to="/Shope">Lenovo Ideapad Flex 5 Gen 7</Link></li>
                                   
                                </ul>
                                {/* <div className="men"><img src="assets/img/images/cb1.png" alt="discount" /></div> */}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="collect-items">
                                <div className="collect-item item-1">
                                    <span>15+ Products</span>
                                    <h3 className="title">Top Graphics card</h3>
                                    <ul className="collect-list">
                                        <li><a href="/Shope">ASUS</a></li>
                                        <li><a href="/Shope">MSI</a></li>
                                        <li><a href="/Shope">ASRock</a></li>
                                        <li><a href="/Shope">Gigabyte</a></li>
                                    </ul>
                                    <div className="men"><img src="assets/img/images/gp.png" alt="discount" /></div>
                                </div>
                                <div className="collect-item item-2">
                                    <span>10+ Products</span>
                                    <h3 className="title">Best Laptop</h3>
                                    <ul className="collect-list">
                                        <li><a href="/Shope">HP</a></li>
                                        <li><a href="/Shope">Lenovo</a></li>
                                        <li><a href="/Shope">Victus</a></li>
                                        <li><a href="/Shope">Samsung</a></li>
                                    </ul>
                                    <div className="men"><img src="assets/img/images/lp.png" alt="discount" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="cta-section pt-100 pb-100" data-background="assets/img/bg-img/bg1.jpg">
                <div className="overlay"></div>
                <div className="container">
                    <div className="cta-wrap text-center">
                        <span>High Performance Graphics Card </span>
                        <h2 className="title">-15% Off Discount All Here</h2>
                        <Link to="/Shope" className="rr-primary-btn cta-btn">View Products</Link>
                    </div>
                </div>
            </section>


            <div className="sponsor-section pt-100">
                <div className="container">
                    <div className="row sponsor-wrap">
                        <div className="sponsor-item bd-right bd-bottom">
                            <Link to="/"><img src="assets/img/sponsor/hp.jpg" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item bd-right bd-bottom">
                            <Link to="/"><img src="assets/img/sponsor/lenovo.jpg" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item bd-right bd-bottom">
                            <Link to="/"><img src="assets/img/sponsor/victus.jpg" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item bd-right bd-bottom">
                            <Link to="/"><img src="assets/img/sponsor/dell.jpg" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item bd-bottom">
                            <Link to="/"><img src="assets/img/sponsor/asus.jpg" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item bd-right">
                            <Link to="/"><img src="assets/img/sponsor/intel.jpg" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item bd-right">
                            <Link to="/"><img src="assets/img/sponsor/ryzen.png" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item bd-right">
                            <Link to="/"><img src="assets/img/sponsor/nvidia.png" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item bd-right">
                            <Link to="/"><img src="assets/img/sponsor/sam.jpg" alt="img" /></Link>
                        </div>
                        <div className="sponsor-item">
                            <Link to="/"><img src="assets/img/sponsor/as.png" alt="img" /></Link>
                        </div>
                    </div>
                </div>
            </div>


            <section className="deal-section pt-100 pb-100">
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
                                <div className="col-md-6">
                                    <div className="shop-item deal-shop">
                                        <div className="shop-thumb">
                                            <div className="overlay"></div>
                                            <img src="assets/img/shop/lenovo1.jpg" alt="shop" />
                                            <span className="sale">New</span>
                                            <ul className="shop-list">
                                                <li><a href="#"><i className="fa-regular fa-cart-shopping"></i></a></li>
                                                <li><a href="#"><i className="fa-light fa-heart"></i></a></li>
                                                <li><a href="#"><i className="fa-light fa-eye"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="shop-content">
                                            <span className="category">Laptop</span>
                                            <h3 className="title"><Link to="/Shopgrid">Lenovo LOQ 12th Gen,Intel i5</Link></h3>
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
                                <div className="col-md-6">
                                    <div className="shop-item deal-shop">
                                        <div className="shop-thumb">
                                            <div className="overlay"></div>
                                            <img src="assets/img/shop/victus1.jpg" alt="shop" />
                                            <span className="sale">New</span>
                                            <ul className="shop-list">
                                                <li><a href="#"><i className="fa-regular fa-cart-shopping"></i></a></li>
                                                <li><a href="#"><i className="fa-light fa-heart"></i></a></li>
                                                <li><a href="#"><i className="fa-light fa-eye"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="shop-content">
                                            <span className="category">Laptop</span>
                                            <h3 className="title"><Link to="/Shopgrid">Hp Victus 15 Laptop</Link></h3>
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
                                            <span className="price"> <span className="offer">₹2600</span>₹82784</span>
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
