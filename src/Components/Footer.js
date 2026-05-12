import React from 'react'

const Footer = () => {
  return (
    <>
     <div className="footer-section bg-grey pt-60">
                <div className="container">
                    <div className="footer-items">
                        <div className="footer-item">
                            <div className="icon">
                                <img src="assets/img/icon/footer-1.png" alt="icon" />
                            </div>
                            <div className="content">
                                <h4 className="title">Free Shipping</h4>
                                <span>Free shipping on orders over ₹1200</span>
                            </div>
                        </div>
                        <div className="footer-item">
                            <div className="icon">
                                <img src="assets/img/icon/footer-2.png" alt="icon" />
                            </div>
                            <div className="content">
                                <h4 className="title">Free Returns</h4>
                                <span>30-days free return polic</span>
                            </div>
                        </div>
                        <div className="footer-item">
                            <div className="icon">
                                <img src="assets/img/icon/footer-3.png" alt="icon" />
                            </div>
                            <div className="content">
                                <h4 className="title">Secured Payments</h4>
                                <span>We accept all major credit card</span>
                            </div>
                        </div>
                        <div className="footer-item item-2">
                            <div className="icon">
                                <img src="assets/img/icon/footer-4.png" alt="icon" />
                            </div>
                            <div className="content">
                                <h4 className="title">Customer Service</h4>
                                <span>Top notch customer service</span>
                            </div>
                        </div>
                    </div>
    
                    </div>
                    <div className="copyright-area">
                        <div className="container">
                            <div className="row copyright-content">
                                <div className="col-lg-6">
                                    <div className="footer-img-wrap">
                                        <span>Payment System:</span>
                                        <div className="footer-img"><a href="a"><img src="assets/img/images/footer-img-1.png" alt="img"/></a></div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <p>Copyright & Design 2025 <span>©QuickCart</span>. All Right Reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
      
    </>
  )
}

export default Footer
