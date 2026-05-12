import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer';
import Login from './Pages/Login';
import { useLocation } from 'react-router-dom';
import Register from './Pages/Register';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Shope from './Pages/Shope';
import Shopgrid from './Pages/Shopgrid';
import Contact from './Pages/Contact';
import Wish from './Pages/Wish';
import Userprofile from './Pages/Userprofile';
import Productdetails from './Pages/Productdetails';
import Checkout from './Pages/Checkout';
import Update from './Pages/Update';
import Checkout2 from './Pages/Checkout2';
import Order from './Pages/Order'
import Forgot from './Pages/Forgot'
import Invoice from './Pages/Invoice'
import Search from './Pages/Search';
import Changepass from './Pages/Changepass';






function App() {
  return (

    
    <BrowserRouter>
    <MainContent/>
    </BrowserRouter>
   
  );
}
function MainContent(){
  const location = useLocation();
  const isCompanyReg = location.pathname === "/Login" ;
  const isCompanyReg1 = location.pathname === "/Register" ;
  const isCompanyReg2 = location.pathname === "/Forgot" ;
  const isCompanyReg3 = location.pathname === "/Invoice" ;
  const isCompanyReg4 = location.pathname === "/Changepass" ;
 

  return(
     <>
     {!isCompanyReg && !isCompanyReg1 && !isCompanyReg2 && !isCompanyReg3 && !isCompanyReg4 && (
      <Navbar/>
     )}
     
 

   
   <Routes>
   <Route path="/Login" element={<Login></Login>}></Route>
   <Route path="/Register" element={<Register></Register>}></Route>
   <Route path="/" element={<Home></Home>}></Route>
   <Route path="/Product" element={<Product></Product>}></Route>
   <Route path="/Cart" element={<Cart></Cart>}></Route>
   <Route path="/Shope" element={<Shope></Shope>}></Route>
   <Route path="/Shopgrid" element={<Shopgrid></Shopgrid>}></Route>
   <Route path="/Contact" element={<Contact></Contact>}></Route>
   <Route path="/Wish" element={<Wish></Wish>}></Route>
   <Route path="/Userprofile" element={<Userprofile></Userprofile>}></Route>
   <Route path="/Productdetails" element={<Productdetails></Productdetails>}></Route>
   <Route path="/Checkout" element={<Checkout></Checkout>}></Route>
   <Route path="/Update" element={<Update></Update>}></Route>
   <Route path="/Checkout2" element={<Checkout2></Checkout2>}></Route>
   <Route path="/Order" element={<Order></Order>}></Route>
   <Route path="/Forgot" element={<Forgot></Forgot>}></Route>
   <Route path="/Invoice" element={<Invoice></Invoice>}></Route>
   <Route path="/Search" element={<Search></Search>}></Route>
   <Route path="/Changepass" element={<Changepass></Changepass>}></Route>
 
    
   </Routes>

 

  {!isCompanyReg && ! isCompanyReg1 && !isCompanyReg2 && !isCompanyReg3 && !isCompanyReg4 && <Footer/>}
   </>
  );
}

export default App;
