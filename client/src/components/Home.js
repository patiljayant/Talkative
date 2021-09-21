import '../assets/Home.css';
import Navbar from './Navbar';
import { useState } from 'react'


const Home = (props) => {
    const [scrolled, setScrolled] = useState(false)
    
    const handleScroll = () => {
        if(window.scrollY >70)
            setScrolled(true);

        else
            setScrolled(false);
    }
    window.addEventListener("scroll", handleScroll);
    const navbarProps = {...props, scrolled : scrolled};
    return ( 
        <>
            <Navbar props={navbarProps}/>
            <div className="home">
                <div className="pimg1">
                    <div className="overlay">
                    </div>
                    <div className="main">
                        <div className="home-header">
                            TALKATIVE
                        </div>
                        <p>
                            Platform to mix up remotely
                        </p>
                        <span>We always take care of your privacy</span>
                    </div>
                </div>
                <div className="pblank">
                    <div className="features ">
                        Our features'
                    </div>
                    <div className="features-list">
                        <div className="feature">
                            <span>Interactive Platform</span>
                            <i className="fas fa-anchor"></i>
                            <p>
                                This is the interactive platform that connects our user with us to know the issues they face while surfing out platform.
                            </p>
                        </div>
                        <div className="feature">
                            <span>Instant Actions</span>
                            <i className="fas fa-tools"></i>
                            <p>
                                We have a bunch of skilled developers to resolve the bug or issue you observe.
                            </p>
                        </div>
                        <div className="feature">
                            <span>Easy to use</span>
                            <i className="fas fa-globe"></i>
                            <p>
                                Our platform is built in very user friendly manner with a responsive frontend compatible on all devices.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pimg2">
                    <div className="overlay">    
                    </div>
                    <div className="connect-head">
                        Follow Talkative on'
                    </div>
                    <div className="icons-list">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Home;