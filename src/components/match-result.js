import React, {useState, useEffect} from 'react'
import "./match-result.css";

export default function Progressbar() {
	const [filled, setFilled] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	useEffect(() => {
		if (filled < 100 && isRunning) {
			setTimeout(() => setFilled(prev => prev += 2), 50)
		}
	},[filled, isRunning])
  return (
	  <div>

        <div className='moveeeee'>
            <div className='nammm'>Matching Result</div>
		  <div className="progressbar">
			  <div style={{
				  height: "100%",
				  width: `${filled}%`,
				  backgroundColor: "#ff9a9a",
				  transition:"width 0.5s"
			  }}></div>
			  <span className="progressPercent">{ filled }%</span>
		  </div>
          <div className='padddd'>
		  <button className="btnnn1" onClick={() => {setIsRunning(true)}}>Run</button>
          </div>
	</div>
    </div>
  )
}
