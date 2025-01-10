import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxTemplate = () => {
  useEffect(() => {
    // GSAP Parallax
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "0 0",
        end: "100% 100%",
        scrub: true,
      },
    });

    tl.fromTo(".background", { y: 0 }, { y: -200 }, 0)
      .fromTo(".layer1", { y: 50 }, { y: -150 }, 0)
      .fromTo(".layer2", { y: 100 }, { y: -300 }, 0)
      .fromTo(".layer3", { y: 150 }, { y: -450 }, 0);

    // Arrow Interaction
    const arrowBtn = document.querySelector("#arrow-btn");
    if (arrowBtn) {
      arrowBtn.addEventListener("mouseenter", () => {
        gsap.to(".arrow", { y: 10, duration: 0.5, ease: "power1.out" });
      });

      arrowBtn.addEventListener("mouseleave", () => {
        gsap.to(".arrow", { y: 0, duration: 0.5, ease: "power1.out" });
      });
    }
  }, []);

  return (
    <div className="relative h-screen scroll-container">
      <div className="absolute top-0 left-0 w-full h-[200%] bg-transparent"></div>
      <main className="fixed inset-0 w-full h-full overflow-hidden">
        <svg
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <mask id="mask">
            <rect fill="white" width="100%" height="100%" />
          </mask>

          {/* Background */}
          <image
            className="background"
            xlinkHref="https://example.com/background.jpg"
            width="1200"
            height="800"
          />

          {/* Parallax Layers */}
          <image
            className="layer1"
            xlinkHref="https://example.com/layer1.png"
            width="1200"
            height="800"
          />
          <image
            className="layer2"
            xlinkHref="https://example.com/layer2.png"
            width="1200"
            height="800"
          />
          <image
            className="layer3"
            xlinkHref="https://example.com/layer3.png"
            width="1200"
            height="800"
          />

          {/* Text with Mask */}
          <g mask="url(#mask)">
            <rect fill="white" width="100%" height="100%" />
            <text
              x="50%"
              y="50%"
              className="text-5xl font-bold"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              fill="#162a43"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              YOUR TEXT HERE
            </text>
          </g>

          {/* Arrow */}
          <polyline
            className="arrow"
            fill="#fff"
            points="600,250 600,290 590,280 590,283 600,293 610,283 610,280 601,290 601,250"
          />
          <rect
            id="arrow-btn"
            width="100"
            height="100"
            opacity="0"
            x="550"
            y="220"
            className="cursor-pointer"
          />
        </svg>
      </main>
    </div>
  );
};

export default ParallaxTemplate;