import React from "react";
// import footerBg from "./assets/footer-bg.png";

const Footer = () => {
	return (
		<>
			<footer
				className="text-white relative footer-component"
				style={{
					backgroundImage: "url('/footer_bg.png')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundColor: "black",
				}}>
				{/* Background Overlay */}
				<div className="absolute z-[0] inset-0 w-full bg-black opacity-60"></div>

				{/* Main Footer Sections (Hidden Layer Placeholder) */}
				<div
					className="hide w-full inset-0 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left"
					style={{
						opacity: 0,
					}}>
					{/* Logo & Tagline */}
					<div>
						<div className="flex items-center space-x-3 mb-2">
							<div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center text-green-900 font-bold text-xl">
								W
							</div>
							<h1 className="text-2xl font-extrabold text-green-300">
								WasteWise
							</h1>
						</div>
						<p className="text-sm text-green-100">
							Smart Sorting for a Cleaner Tomorrow
						</p>
					</div>

					{/* Learn */}
					{/* <div>
						<h3 className="font-bold mb-4 text-lg">LEARN</h3>
						<ul className="space-y-2">
							<li>
								<a className="text-white" href="#">
									What's New
								</a>
							</li>
							<li>
								<a className="text-white" href="#">
									Getting Started
								</a>
							</li>
							<li>
								<a className="text-white" href="#">
									Browse Articles
								</a>
							</li>
							<li>
								<a className="text-white" href="#">
									Free Courses
								</a>
							</li>
						</ul>
					</div> */}

					{/* General */}
					{/* <div>
						<h3 className="font-bold mb-4 text-lg">GENERAL</h3>
						<ul className="space-y-2">
							<li>
								<a className="text-white" href="#">
									About
								</a>
							</li>
							<li>
								<a className="text-white" href="#">
									Give Back
								</a>
							</li>
							<li>
								<a className="text-white" href="#">
									Blog
								</a>
							</li>
							<li>
								<a className="text-white" href="#">
									Careers
								</a>
							</li>
							<li>
								<a className="text-white" href="#">
									Labs
								</a>
							</li>
						</ul>
					</div> */}

					{/* Meet Our Team */}
					<div>
						<h3 className="font-bold mb-4 text-lg">MEET OUR TEAM</h3>
						<ul className="space-y-2 text-green-200 text-sm">
							<li>Annas Ahmed - EB21102019</li>
							<li>Muhammad Siraj Ahmed - EB21102082</li>
							<li>Muhammad Abrar Khan - EB21102051</li>
							<li>Shaikh Muhammad Ezan - EB21102103</li>
						</ul>
					</div>
				</div>

				{/* Actual Visible Content */}
				<div
					className="absolute w-full/ inset-0 max-w-7xl mx-auto flex justify-between max-md:justify-start max-md:gap-10 max-md:flex-col footer-content"
					>
					{/* Logo & Tagline */}
					<div>
						<div className="flex items-center space-x-3 gap-2 mb-2">
							<div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center text-green-900 font-bold text-xl">
								W
							</div>
							<h1 className="text-2xl font-extrabold text-green-300">
								WasteWise
							</h1>
						</div>
						<p className="text-sm text-green-100">
							Smart Sorting for a Cleaner Tomorrow
						</p>
					</div>

					{/* Meet Our Team */}
					<div>
						<h3 className="font-bold mb-4 text-xl">OUR TEAM</h3>
						<ul className="space-y-2 text-green-200 text-sm">
							<li>Annas Ahmed - EB21102019</li>
							<li>Muhammad Siraj Ahmed - EB21102082</li>
							<li>Muhammad Abrar Khan - EB21102051</li>
							<li>Shaikh Muhammad Ezan - EB21102103</li>
						</ul>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
