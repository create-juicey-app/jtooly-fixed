import Image from "next/image";

const ParallaxImage = ({ image, strength }) => {
    const handleMouseMove = (event) => {
      const x = event.clientX - window.innerWidth / 2;
      const y = event.clientY - window.innerHeight / 2;
      const translateX = (x / window.innerWidth) * strength;
      const translateY = (y / window.innerHeight) * strength;
      const imageElement = event.target;
      imageElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
    };
  
    const handleMouseLeave = (event) => {
      const imageElement = event.target;
      imageElement.style.transform = '';
    };
  
    return (
        <img
        alt="parallax image"
          src={image}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: strength,
          }}
          width={1920}
          height={1080}
        />
      );
    };
    
    const ParallaxContainer = () => (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <ParallaxImage image="/parralax/1.png" strength={1} style={{ top: '-10%', left: '-10%' }} />
        <ParallaxImage image="/parralax/2.png" strength={2} style={{ top: '-20%', left: '-20%' }} />
        <ParallaxImage image="/parralax/3.png" strength={3} style={{ top: '-30%', left: '-30%' }} />
      </div>
    );
    
    export default function page() {
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <p>hru??</p>
          </div>
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 0 }}>
            <ParallaxContainer />
          </div>
        </div>
      );
    }