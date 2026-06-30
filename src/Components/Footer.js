import React from 'react'

const Footer = () => {
  return (
    <>
     <div className="footer-section bg-gray-100 pt-20">
                <div className="container">
    <div className="footer-items grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6 sm:items-start">
        <div className="footer-item flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
            <div className="icon">
                <img src="assets/img/icon/footer-1.png" alt="icon" className="w-8 h-8 sm:w-auto sm:h-auto" />
            </div>
            <div className="content">
                <h4 className="title text-sm sm:text-base font-semibold">Free Shipping</h4>
                <span className="!hidden sm:!block text-sm text-gray-500">Free shipping on orders over ₹1200</span>
            </div>
        </div>

        <div className="footer-item flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
            <div className="icon">
                <img src="assets/img/icon/footer-2.png" alt="icon" className="w-8 h-8 sm:w-auto sm:h-auto" />
            </div>
            <div className="content">
                <h4 className="title text-sm sm:text-base font-semibold">Free Returns</h4>
                <span className="!hidden sm:!block text-sm text-gray-500">30-days free return polic</span>
            </div>
        </div>

        <div className="footer-item flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
            <div className="icon">
                <img src="assets/img/icon/footer-3.png" alt="icon" className="w-8 h-8 sm:w-auto sm:h-auto" />
            </div>
            <div className="content">
                <h4 className="title text-sm sm:text-base font-semibold">Secured Payments</h4>
                <span className="!hidden sm:!block text-sm text-gray-500">We accept all major credit card</span>
            </div>
        </div>

        <div className="footer-item item-2 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
            <div className="icon">
                <img src="assets/img/icon/footer-4.png" alt="icon" className="w-8 h-8 sm:w-auto sm:h-auto" />
            </div>
            <div className="content">
                <h4 className="title text-sm sm:text-base font-semibold">Customer Service</h4>
                <span className="!hidden sm:!block text-sm text-gray-500">Top notch customer service</span>
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
                                        <div className="footer-img"><img src="assets/img/images/footer-img-1.png" alt="img"/></div>
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
