import React, { useState, useEffect } from "react";
import "./HeroSlider.css"; // We'll create this CSS file next

const slides = [
	{
		image: "https://d-waste.com/wp-content/uploads/2023/05/slide1.jpg",
		title: "First Slide Title",
		description: "Description text for the first slide",
		linkText: "Learn More",
		linkUrl: "#",
	},
	{
		image: "https://d-waste.com/wp-content/uploads/2023/05/slide2.jpg",
		title: "Second Slide Title",
		description: "Description text for the second slide",
		linkText: "Get Started",
		linkUrl: "#",
	},
	{
		image: "https://d-waste.com/wp-content/uploads/2023/05/slide3.jpg",
		title: "Third Slide Title",
		description: "Description text for the third slide",
		linkText: "Contact Us",
		linkUrl: "#",
	},
];

const HeroSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// Auto-play functionality
	useEffect(() => {
		let interval;
		if (isAutoPlaying) {
			interval = setInterval(() => {
				goToSlide(currentSlide + 1);
			}, 5000);
		}
		return () => clearInterval(interval);
	}, [currentSlide, isAutoPlaying]);

	const goToSlide = (index) => {
		const newIndex = (index + slides.length) % slides.length;
		setCurrentSlide(newIndex);
	};

	const pauseSlider = () => setIsAutoPlaying(false);
	const resumeSlider = () => setIsAutoPlaying(true);

	return (
		<div className="hero-slider">
			<div className="slider-wrapper">
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`slide ${index === currentSlide ? "active" : ""}`}
						style={{ backgroundImage: `url(${slide.image})` }}>
						<div className="slide-content">
							<h1>{slide.title}</h1>
							<p>{slide.description}</p>
							<a href={slide.linkUrl} className="btn">
								{slide.linkText}
							</a>
						</div>
					</div>
				))}
			</div>

			<div className="slider-controls">
				<button
					className="prev-slide"
					onClick={() => {
						pauseSlider();
						goToSlide(currentSlide - 1);
						resumeSlider();
					}}>
					‹
				</button>

				<div className="slide-dots">
					{slides.map((_, index) => (
						<span
							key={index}
							className={`dot ${index === currentSlide ? "active" : ""}`}
							onClick={() => {
								pauseSlider();
								goToSlide(index);
								resumeSlider();
							}}
						/>
					))}
				</div>

				<button
					className="next-slide"
					onClick={() => {
						pauseSlider();
						goToSlide(currentSlide + 1);
						resumeSlider();
					}}>
					›
				</button>
			</div>
		</div>
	);
};

export default HeroSlider;
