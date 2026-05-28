import React from 'react'

 function Contact() {

   
  return (
    <>
      
      <div class="mobile-side-menu">
            <div class="side-menu-content">
                <div class="side-menu-head">
                    <a href='index.html'><img src="assets/img/logo/logo-1.png" alt="logo"/></a>
                    <button class="mobile-side-menu-close"><i class="fa-regular fa-xmark"></i></button>
                </div>
                <div class="side-menu-wrap"></div>
                <ul class="side-menu-list">
                    <li><i class="fa-light fa-location-dot"></i>Address : <span>Amsterdam, 109-74</span></li>
                    <li><i class="fa-light fa-phone"></i>Phone : <a href="tel:+01569896654">+01 569 896 654</a></li>
                    <li><i class="fa-light fa-envelope"></i>Email : <a href="mailto:info@example.com">info@example.com</a></li>
                </ul>
            </div>
        </div>
       

        <section class="page-header">
            <div class="shape"><img src="assets/img/shapes/page-header-shape.png" alt="shape"/></div>
            <div class="container">
                <div class="page-header-content">
                    <h1 class="title">Contact</h1>
                    <h4 class="sub-title">
                        <span class="home">
                            <a href="#">
                                <span>Home</span>
                            </a>
                        </span>
                        <span class="icon"><i class="fa-solid fa-angle-right"></i></span>
                        <span class="inner">
                            <span>Contact</span>
                        </span>
                    </h4>
                </div>
            </div>
        </section>
        
       

        <section class="contact-section pt-100 pb-100">
            <div class="container">
                <div class="row contact-wrap">
                    <div class="col-lg-8 col-md-12">
                        <div class="blog-contact-form form-2">
                            <div class="request-form">
                                <h2 class="form-title">Get in Touch</h2>
                                <form action="" method="post" id="ajax_contact" class="form-horizontal">
                                    <div class="form-group row">
                                        <div class="col-md-6">
                                            <div class="form-item">
                                                <h4 class="form-header">Your name</h4>
                                                <input type="text" id="fullname" name="fullname" class="form-control" placeholder=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-item">
                                                <h4 class="form-header">Email address</h4>
                                                <input type="text" id="email" name="email" class="form-control" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-12">
                                            <div class="form-item">
                                                <h4 class="form-header">Subject</h4>
                                                <input type="text" id="subject" name="subject" class="form-control" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-12">
                                            <div class="form-item message-item">
                                                <h4 class="form-header">Write Your Message</h4>
                                                <textarea id="message" name="message" cols="30" rows="5" class="form-control address" placeholder=""></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="submit-btn">
                                        <button id="submit" class="rr-primary-btn" type="submit">Submit Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-18">
                        {/* <div class="contact-content"> */}
                            <div class="contact-img"><img src="assets/img/images/contactus.jpg" alt=""/></div>
                            {/* <div class="contact-info-box">
                                <h3 class="title">Clothing Store</h3>
                                <ul>
                                    <li>Germany — 785 15h Street, Office 478/B  Green Mall Berlin, De 81566</li>
                                    <li>Phone: <a href="tel:+1123456788">+1 1234 567 88</a></li>
                                    <li>Email: <a href="mailto:contact@example.com">contact@example.com</a></li>
                                </ul>
                            </div>
                            <div class="contact-info-box">
                                <h3 class="title">Opening Hours</h3>
                                <ul>
                                    <li>Monday - Friday : 9am - 5pm Weekend Closed</li>
                                </ul>
                            </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </section>
      
       
    </>
  )
}
export default Contact