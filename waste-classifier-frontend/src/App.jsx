import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { wasteInfo } from "../data";
import heroImage from "./assets/heroImage323.png";
import HeroSlider from "./HeroSlider";
import Footer from "./Footer";
import cardboard from "./assets/labels/new/cardboard.png";
import glass from "./assets/labels/new/glass.png";
import metal from "./assets/labels/new/metal.png";
import paper from "./assets/labels/new/paper.png";
import plastic from "./assets/labels/new/plastic.png";
import trash from "./assets/labels/new/trash.png";

const WasteInfoBottomSheet = ({ wasteClass, onClose }) => {
	const info = wasteInfo[wasteClass.toLowerCase()] || wasteInfo.trash;

	return (
		<div className="bottom-sheet">
			<div className="bottom-sheet-overlay" onClick={onClose}></div>
			<div className="bottom-sheet-content">
				<div className="bottom-sheet-header">
					<h3>{info.title}</h3>
					<button className="close-btn" onClick={onClose}>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>
				<div className="bottom-sheet-body">
					{info.content.map((item, index) => (
						<div key={index} className="info-section">
							<h4>{item.heading}</h4>
							<p>{item.text}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

function App() {
	const [showTeamInfo, setShowTeamInfo] = useState(false);
	const [image, setImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [prediction, setPrediction] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showInfoSheet, setShowInfoSheet] = useState(false);
	const labels = [
		{ title: "cardboard", image: cardboard },
		{ title: "glass", image: glass },
		{ title: "metal", image: metal },
		{ title: "paper", image: paper },
		{ title: "plastic", image: plastic },
		{ title: "trash", image: trash },
	];

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setPreviewUrl(URL.createObjectURL(file));
			setPrediction(null);
			setError(null);
		}
	};

	const handleSubmit = async () => {
		if (!image) {
			setError("Please upload an image first.");
			return;
		}

		const formData = new FormData();
		formData.append("file", image);

		setLoading(true);
		setError(null);
		try {
			const res = await axios.post(
				"https://waste-classifier-fyp.onrender.com/api/predict",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);

			if (res.data.confidence < 0.5) {
				setError(
					"Low confidence (below 40%). Please try again with a clearer image.",
				);
				setPrediction(null);
			} else {
				setPrediction(res.data);
			}
		} catch (err) {
			console.error("Prediction error:", err);
			setError("Prediction failed. Please try again.");
			setPrediction(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<header
				className="header-bar z-90 shadow-lg bg-white fixed top-0 w-full"
				style={{
					backgroundImage: "url('/footer_bg.png')",
					backgroundSize: "cover",
					backgroundPosition: "bottom",
					padding: "1rem 9rem",
					backgroundColor: "black",
				}}>
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
			</header>
			<header
				className="z-90 shadow-lg bg-white fixed/ top-0 w-full"
				style={{
					backgroundImage: "url('/footer_bg.png')",
					backgroundSize: "cover",
					backgroundPosition: "bottom",
					padding: "1rem 9rem",
					backgroundColor: "black",
				}}>
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
			</header>
			<div className="relative">
				<img src={heroImage} className="w-full h-screen/" alt="" />
				<div className="absolute inset-0 w-full bg-black opacity-30 "></div>
			</div>
			<h4
				className="header-bar font-bold text-3xl text-black"
				style={{
					margin: "40px 0 0px 0",
				}}>
				Categories
			</h4>
			<div className="flex overflow-x-auto gap-6 header-bar header-bar-2 hide-scrollbar">
				{labels.map((v, i) => {
					return (
						<div
							className="flex-1 bg-white shadow-lg rounded-lg flex flex-col items-center gap-4 transition-transform transform hover:scale-105"
							style={{
								minWidth: "125px",
								// height: "200px",
								padding: "10px",
								// Allow dynamic height to adjust to content
							}}>
							<div
								className="flex-1 overflow-hidden rounded-lg"
								style={
									{
										// height: "100%",
										// maxHeight: "200px",
									}
								}>
								<img
									src={v.image}
									className="w-full h-20/ object-cover"
									alt={v.title}
								/>
							</div>
							<h4 className="font-medium text-xl text-center text-gray-800 capitalize">
								{v.title}
							</h4>
						</div>
					);
				})}
			</div>

			<div className="app-container">
				<div className="app-card">
					<header className="app-header">
						<h1>Waste Classification</h1>
						<p>Upload an image to identify waste material type</p>
					</header>

					<div className="upload-container">
						<label className="file-upload">
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
							/>
							<div className="upload-content">
								{previewUrl ? (
									<>
										<img src={previewUrl} alt="Preview" className="thumbnail" />
										<button
											className="reupload-btn"
											onClick={(e) => {
												e.stopPropagation();
												document.querySelector(".file-upload input").click();
											}}>
											<svg
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor">
												<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
												<line x1="16" y1="5" x2="22" y2="5"></line>
												<line x1="19" y1="2" x2="19" y2="8"></line>
											</svg>
											Change Image
										</button>
									</>
								) : (
									<div className="upload-placeholder">
										<svg
											width="48"
											height="48"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor">
											<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
											<line x1="16" y1="5" x2="22" y2="5"></line>
											<line x1="19" y1="2" x2="19" y2="8"></line>
											<circle cx="9" cy="9" r="2"></circle>
											<path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
										</svg>
										<span>Select an image</span>
									</div>
								)}
							</div>
						</label>
					</div>

					<div className="action-container">
						<button
							onClick={handleSubmit}
							disabled={loading || !image}
							className={`submit-btn ${loading ? "loading" : ""}`}>
							{loading ? (
								<>
									<span className="spinner"></span>
									Analyzing...
								</>
							) : (
								"Classify Waste"
							)}
						</button>
					</div>

					{error && (
						<div className="error-message">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							{error}
						</div>
					)}

					{prediction && (
						<div className="result-container">
							<h3>Classification Result</h3>
							<div className="result-details">
								<div className="result-item">
									<span>Material Type:</span>
									<strong>{prediction.class}</strong>
								</div>
								<div className="result-item">
									<span>Probability:</span>
									<div className="confidence-bar">
										<div
											className="confidence-fill"
											style={{
												width: `${prediction.confidence * 100}%`,
											}}></div>
										<span
											className="text-blue-400"
											style={{
												color: "blue",
											}}>
											{(prediction.confidence * 100).toFixed(1)}%
										</span>
									</div>
								</div>
								<button
									className="info-btn"
									onClick={() => setShowInfoSheet(true)}>
									Learn about {prediction.class} waste
								</button>
							</div>
						</div>
					)}

					{showInfoSheet && prediction && (
						<WasteInfoBottomSheet
							wasteClass={prediction.class}
							onClose={() => setShowInfoSheet(false)}
						/>
					)}

					{showTeamInfo && (
						<div className="team-modal">
							<div className="team-modal-content">
								<h3>Final Year Project</h3>
								<h4>Waste Classification System</h4>

								<div className="team-members">
									<div className="member">
										<span>Annas Ahmed</span>
										<span>EB21102019</span>
									</div>
									<div className="member">
										<span>Muhammad Siraj Ahmed</span>
										<span>EB21102082</span>
									</div>
									<div className="member">
										<span>Muhammad Abrar Khan</span>
										<span>EB21102051</span>
									</div>
									<div className="member">
										<span>Shaikh Muhammad Ezan</span>
										<span>EB21102103</span>
									</div>
								</div>

								<p className="project-description">
									This intelligent waste classification system helps promote
									proper waste management by identifying waste types and
									providing recycling/disposal guidance using machine learning.
								</p>

								<button
									className="close-btn"
									onClick={() => setShowTeamInfo(false)}>
									Close
								</button>
							</div>
						</div>
					)}

					<footer className="app-footer">
						<button onClick={() => setShowTeamInfo(true)}>
							BCSC - 21 FYP - WasteWise - A Smart Waste Classification System
						</button>
					</footer>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default App;
