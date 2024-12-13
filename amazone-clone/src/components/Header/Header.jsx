import React, { useContext } from 'react'
import classes from "./Header.module.css"
import {Link } from "react-router-dom"
import { SlLocationPin} from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';
// import { auth } from '../../Utility/firbase';
import {auth}  from "../../Utility/firbase"


const Header = () => {
  const [{basket,user},dispatch]=useContext(DataContext)
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* logo section */}
          <div className= {classes.logo__container}> 
            <Link to="/">
              <img  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo" />
            </Link>
            <div className={classes.delivery} >
              <span>
                <SlLocationPin />
              </span>
              <div >
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search section */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>
          {/* other section */}
          <div className={classes.order__container}>
            <Link to=""  className={classes.language}>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="" />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user && "/auth"} >
            <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => (user ? auth.signOut() : null)}>
                      Sign Out
                    </span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link  to="/orders" >
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link  to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
<LowerHeader/>
    </section>
  );
};
export default Header





{/* <form>
  <label for="country">Choose a country:</label>
  <select id="country" name="country">
    <option value="ethiopia">Ethiopia</option>
    <option value="usa">USA</option>
    <option value="canada">Canada</option>
  </select>
  <button type="submit">Submit</button>
</form> */}



{/* <form>
  <label for="hobbies">Select your hobbies:</label>
  <select id="hobbies" name="hobbies" multiple>
    <option value="reading">Reading</option>
    <option value="sports">Sports</option>
    <option value="music">Music</option>
  </select>
</form> */}


{/* <select id="fruits">
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</select>
<p id="selected"></p>

<script>
  const selectElement = document.getElementById("fruits");
  selectElement.addEventListener("change", function () {
    document.getElementById("selected").textContent = 
      `You selected: ${this.value}`;
  });
</script> */}

{/* <input type="text" name="username" placeholder="Enter your name" /> */}

{/* <input type="text" name="username" placeholder="Enter your name" /> */}


{/* <input type="password" name="password" placeholder="Enter your password" /> */}

{/* <input type="email" name="email" placeholder="Enter your email" /> */}

{/* <input type="number" name="age" min="1" max="100" /> */}

{/* <input type="checkbox" name="subscribe" /> Subscribe to newsletter */}

{/* <input type="radio" name="gender" value="male" /> Male
<input type="radio" name="gender" value="female" /> Female */}

{/* <input type="file" name="profilePicture" /> */}

{/* <input type="submit" value="Submit" /> */}

{/* <input type="reset" value="Reset" /> */}

{/* <input type="date" name="birthdate" /> */}


{/* <form action="/submit-login" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required />

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required />

  <input type="submit" value="Login" />
</form> */}
