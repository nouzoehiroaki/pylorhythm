import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
const Slide: React.FC = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const pinRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        const pin = gsap.fromTo(sectionRef.current, {
            translateX:0
        },{
            translateX:"-300vw",
            ease:"none",
            duration:1,
            scrollTrigger:{
                trigger:triggerRef.current,
                start:"top top",
                end:"2000 top",
                scrub:0.6,
                pin:true
            }

        });
        return () =>{
            pin.kill()
        }
    }, []);

    useEffect(() => {
        const txt1 = document.querySelector('.spanOne');
        const img1 = document.querySelector('.imgOne');
        const txt2 = document.querySelector('.spanTwo');
        const img2 = document.querySelector('.imgTwo');
        const txt3 = document.querySelector('.spanThree');
        const img3 = document.querySelector('.imgThree');
        const txt4 = document.querySelector('.spanFour');
        const img4 = document.querySelector('.imgFour');
        const pin02 = gsap.timeline({
            defaults: {
                duration: 300
              },
              scrollTrigger: {
                trigger: pinRef.current,
                scrub: !0,
                start: '-=300',
                end: '+=3000',
                pin: !0,
                markers: true
              }
        })
        .to(txt1, { opacity: 0, delay: 600 })
        .to(img1, { opacity: 0, y: -20 }, "<")

        .fromTo(txt2, { opacity: 0 }, { opacity: 1 })
        .fromTo(img2, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "<")
        
        .to(txt2, { opacity: 0, delay: 600})
        .to(img2, { opacity: 0, y: -20 }, "<")
        

        .fromTo(txt3, { opacity: 0 }, { opacity: 1 })
        .fromTo(img3, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "<")
        
        .to(txt3, { opacity: 0, delay: 600 })
        .to(img3, { opacity: 0, y: -20 }, "<")
        
        .from(txt4, { opacity: 0 })
        .from(img4, { opacity: 0, y: 20 }, "<")
        
        .to(txt4, { opacity: 1, duration: 600 })
        .to(img4, { opacity: 1, y: -20 }, "<");
        return () =>{
            pin02.kill()
        }
    }, []);
    return (
        <>
            <section className='outer'>
                <div ref={triggerRef}>
                    <div ref={sectionRef} className='inner'>
                        <div className='section'>
                            <h2>section 1</h2>
                        </div>
                        <div className='section'>
                            <h2>section 2</h2>
                        </div>
                        <div className='section'>
                            <h2>section 3</h2>
                        </div>
                        <div className='section'>
                            <h2>section 4</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="outer02">
                <div ref={pinRef} className='inner02'>
                    <div className='section'>
                        <div className="title02">
                            <span className="spanOne">Efficacious</span>
                            <span className="spanTwo">Craven</span>
                            <span className="spanThree">Intelligent</span>
                            <span className="spanFour">Dazzling</span>
                        </div>
                        <div className="images">
                            <img src="/space.jpg" alt="" className="imgOne"/>
                            <img src="/nasa.jpg" alt="" className="imgTwo"/>
                            <img src="/space.jpg" alt="" className="imgThree"/>
                            <img src="/nasa.jpg" alt="" className="imgFour"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Slide;