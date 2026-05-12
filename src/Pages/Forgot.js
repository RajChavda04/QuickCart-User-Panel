import React,{useState} from 'react'
import Swal from "sweetalert2";
import Axios from "axios"

const Forgot = () => {
   
    const [adminEmail, setAdminEmail] = useState('');

    const onForgot = () => {
        Axios.post("http://localhost:1337/api/sendmail", { email1: adminEmail })
            .then((response) => {
                if (response.data.message === "1") {
                    Swal.fire('Success', 'Password sent successfully', 'success');
                } else {
                    Swal.fire('Error', response.data.message, 'error');
                }
            })
            .catch((error) => {
                Swal.fire('Error', 'Something went wrong', 'error');
            });
    };
   
    return (
        <>


            <div class="login-area pt-100 pb-100">
                <div class="logcontainer">

                    <div class="login-wrap text-center">

                        <h3 class="title">Reset your  Password</h3>
                     
                        <div class="login-form">
                            <div class="form-item">
                                <h4 class="form-header">Email address</h4>
                                <input type="text" id="customer_email" name="customer_email" value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                                class="form-control" placeholder="" required />
                            </div>
                            {/* <div class="form-item">
                                <h4 class="form-header">New Password*</h4>
                                <input type="text" id="customer_password" name="customer_password" class="form-control" placeholder="" />
                            </div>
                            <div class="form-item">
                                <h4 class="form-header">Confrirm Password*</h4>
                                <input type="text" id="customer_password" name="customer_password" class="form-control" placeholder="" />
                            </div>
                            */}
                           
                            <div class="submit-btn">
                            
                                <button class="rr-primary-btn" onClick={onForgot} >Submit</button>
                         
                            </div>
                             
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Forgot

