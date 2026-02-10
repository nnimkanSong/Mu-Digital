const Loading = () => {
	return (
		<div className="app-container">
			<style
				dangerouslySetInnerHTML={{
					__html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@300;400;600;700&display=swap');
        
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          background: radial-gradient(circle at center, #1a0b2e 0%, #050508 100%);
          font-family: 'Noto Serif Thai', serif;
          color: #fff;
          padding: 20px;
        }

        .loading-card {
          width: 100%;
          max-width: 400px;
          padding: 60px 50px;
          background-color: rgba(20, 10, 30, 0.7);
          backdrop-filter: blur(15px);
          border-radius: 24px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 1px rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .loading-text {
          color: #FFD700;
          margin: 0 0 30px 0;
          font-size: 28px;
          text-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
          font-weight: 600;
          letter-spacing: 1px;
        }

        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }

        .spinner-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(45deg, #FFC700, #FF8800);
          box-shadow: 0 0 15px rgba(255, 199, 0, 0.5);
          animation: bounce 1.4s ease-in-out infinite;
        }

        .spinner-dot:nth-child(1) { animation-delay: 0s; }
        .spinner-dot:nth-child(2) { animation-delay: 0.2s; }
        .spinner-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .sub-text {
          margin-top: 25px;
          color: #bf5af2;
          font-size: 16px;
          font-weight: 300;
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .loading-card {
            padding: 40px 25px;
          }
          .loading-text {
            font-size: 22px;
          }
        }
      `,
				}}
			/>

			<div className="loading-card">
				<h2 className="loading-text">กำลังโหลด...</h2>
				<div className="spinner-container">
					<div className="spinner-dot"></div>
					<div className="spinner-dot"></div>
					<div className="spinner-dot"></div>
				</div>
				<p className="sub-text">โชคชะตากำลังถูกเปิดเผย</p>
			</div>
		</div>
	);
};

export default Loading;
