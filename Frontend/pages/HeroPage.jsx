"Use client"
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import "../src/App.css"
function HeroPage() {
  useEffect(()=>{
    AOS.init({});
  }, [])
  return (
    <>
      <div id="container-1" data-aos="fade-up" >
    
        <div id="main-container">
          <div id="content">
            <div id="description">
              <h1 className="des-title">Cloud Cataloging</h1>
              <p className="des-para">Your library has never looked so good.</p>
              <button className="des-btn">Get Started</button>
            </div>
          </div>
          <div id="box" >
                <img src="https://www.skoolbeep.com/blog/wp-content/uploads/2020/12/WHAT-IS-THE-PURPOSE-OF-A-LIBRARY-MANAGEMENT-SYSTEM-min.png"  data-aos="fade-up" alt="" />
          </div>

        </div>
      </div>
      <div id="container-2" data-aos="fade-down">
        <div id="content-2">
          <div id="description-2">
            <h1 className="title-des-2">Create & Share Your Collection</h1>
            <p className="para-des-2">Our library management service caters to libraries, schools, organizations, and home catalogs. Our online software lets you create multiple collections, catalog books,
              create tags, leave notes, import/export, share your collections and much more.
            </p>
          </div>
        </div>
      </div>
      <div id="container-3" data-aos="fade-down">
        <div id="box"><img src="https://media.licdn.com/dms/image/v2/C4E12AQHHtPAjhApN4Q/article-cover_image-shrink_423_752/article-cover_image-shrink_423_752/0/1541922713337?e=1746057600&v=beta&t=1hIeY_xyzu7hNRfRDVcrTeOXkW2vqqJZUxk6qXVRbqQ" alt="" /></div>
        <div id="description-3">
          <h1 className="title-des-3">Cloud Sync keeps your collections updated across multiple devices.
          </h1>
          <p className="para-des-3">
            Access your collections from anywhere on virtually any device.
          </p>
        </div>
      </div>
      <div id="review-section" data-aos="fade-up">
        <h2>What Our Users Say</h2>
        <div className="reviews-container">
          <div className="review-card" data-aos="flip-left">
            <p>⭐⭐⭐⭐⭐</p>
            <p>"Library Manager transformed our book collection! Super easy to use."</p>
            <h4>- Sarah Johnson</h4>
          </div>
          <div className="review-card" data-aos="flip-right">
            <p>⭐⭐⭐⭐</p>
            <p>"A great tool for managing our school library. The cloud sync is a game-changer!"</p>
            <h4>- Michael Lee</h4>
          </div>
          <div className="review-card" data-aos="flip-left">
            <p>⭐⭐⭐⭐⭐</p>
            <p>"I love the intuitive interface and automation features. Highly recommended!"</p>
            <h4>- Emily Roberts</h4>
          </div>
        </div>
      </div>
      <div id="continer-4" data-aos="fade-up">
        <div id="pricing-section">
          <div id="pricing">
            <p> Basic Plan</p>
            <small>For Small Libraries</small>
            <div id="discount">
              <p>₹ <del>399.0</del>&nbsp;&nbsp;<span>Save 83%
              </span></p>
            </div>
            <div className="pricing">
              <span>₹ <big>69.00</big>/mo</span>
            </div>

            <button>Choose Plan</button>
            <div className="features">
              <p>✅ Manage up to 500 books</p>
              <p>✅ Basic cataloging & search</p>
              <p>✅ Issue & return tracking</p>
              <p>✅ 1 staff login</p>
            </div>
          </div>
          <div id="pricing">
            <p> Standard Plan</p>
            <small>For Schools & Small Institutions</small>
            <div id="discount">
              <p>₹ <del>399.0</del>&nbsp;&nbsp;<span>Save 83%
              </span></p>
            </div>
            <div className="pricing">
              <span>₹ <big>169.00</big>/mo</span>
            </div>

            <button>Choose Plan</button>
            <div className="features">
              <p>✅ Manage up to 5,000 books</p>
              <p>✅ Advanced search & filters</p>
              <p>✅ Automated overdue reminders</p>
              <p>✅ Multi-user access (up to 5 staff)</p>
            </div>
          </div>
          <div id="pricing">
            <p>Premium Plan </p>
            <small>For Universities & Public Libraries</small>
            <div id="discount">
              <p>₹ <del>699.0</del>&nbsp;&nbsp;<span>Save 64%
              </span></p>
            </div>
            <div className="pricing">
              <span>₹ <big>249.00</big>/mo</span>
            </div>

            <button>Choose Plan</button>
            <div className="features">
              <p>✅ Manage unlimited books</p>
              <p>✅ Barcode & RFID integration</p>
              <p>✅ Student & staff access</p>
              <p>✅ Reports & analytics dashboard</p>
            </div>
          </div>
          <div id="pricing">
            <p>Enterprise Plan</p>
            <small>For Large Digital Libraries</small>
            <div id="discount">
              <p>₹ <del>1699.0</del>&nbsp;&nbsp;<span>Save 65%
              </span></p>
            </div>
            <div className="pricing">
              <span>₹ <big>599.00</big>/mo</span>
            </div>

            <button>Choose Plan</button>
            <div className="features">
              <p>✅ Cloud-based storage</p>
              <p>✅ AI-powered recommendations</p>
              <p>✅ Customizable workflows</p>
              <p>✅ 24/7 premium support</p>
            </div>
          </div>
        </div>


      </div>
      <div id="container-5" data-aos="fade-up">
        <footer>
          <div id="content-3">

            <ul>
              <h1>Platform</h1>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href=""> Pricing</a>
              </li>
              <li>
                <a href=""> Login</a>
              </li>
              <li>
                <a href="">SignUp</a>
              </li>
            </ul>

            <ul>
              <h1>Learn</h1>
              <li>
                <a href="">Contact</a>
              </li>
              <li>
                <a href="">Support</a>
              </li>
              <li>
                <a href="">FAQ's</a>
              </li>
              <li>
                <a href="">Careers</a>
              </li>
            </ul>

            <ul>
              <h1>Policies</h1>
              <li>
                <a href="">Privacy</a>
              </li>
              <li>
                <a href="">Security</a>
              </li>
              <li>
                <a href="">Terms</a>
              </li>

            </ul>

            <ul>
              <h1>Social</h1>
              <li>
                <a href="">Youtube</a>
              </li>
              <li>
                <a href="">Instagram</a>
              </li>
              <li>
                <a href="">Twitter</a>
              </li>
              <li>
                <a href="">Facebook</a>
              </li>
            </ul>


            <div className="library-container">
              <i className="ri-book-open-fill"></i>
              <p>
                Whether you have 50 items or 5,000 items, your library is precious.
                With Library Manager, managing your own private library of books.
                Create Your Account Today.
              </p>
            </div>
          </div>
          <div id="copyright">
            <i class="ri-copyright-line">Library Manager / All rights reserved</i>
          </div>
        </footer>
      </div>

    </>

  )
}

export default HeroPage
