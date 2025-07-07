import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './AnimatedProgressProvider';
import './skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/skills/')
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return (
    <section className="skills-section" id='skills'>
      <div className="skills-wrapper">
        <h2 className="skills-title">My Skills</h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="progress-circle">
                <AnimatedProgressProvider
                  valueStart={0}
                  valueEnd={skill.percentage}
                  duration={1.4}
                  easingFunction={easeQuadInOut}
                >
                  {(value) => (
                    <CircularProgressbar
                      value={value}
                      text={`${Math.round(value)}%`}
                      styles={buildStyles({
                        pathTransition: "stroke-dashoffset 1.4s ease-in-out",
                        pathColor: "#06b6d4",
                        textColor: "#ffffff",
                        trailColor: "#1e293b",
                        strokeWidth: 8,
                        textSize: '16px',
                      })}
                    />
                  )}
                </AnimatedProgressProvider>
              </div>
              <p className="skill-name-text">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;














// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   CircularProgressbar,
//   buildStyles
// } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { easeQuadInOut } from 'd3-ease';
// import AnimatedProgressProvider from './AnimatedProgressProvider';
// import './skills.css'; // Import your custom CSS file

// function Skills() {
//   const [skills, setSkills] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/skills/')
//       .then((res) => setSkills(res.data))
//       .catch((err) => console.error("Error fetching skills:", err));
//   }, []);

//   return (
//     <div className="skills-container">
//       <div className="skills-wrapper">
//         <div className="skills-title-container">
//           <h2 className="skills-title">My Skills</h2>
//         </div>
//         <div className="skills-grid">
//           {skills.map((skill, index) => (
//             <div key={index} className="skill-card">
//               <div className="progress-container">
//                 <div className="progress-wrapper">
//                   <AnimatedProgressProvider
//                     valueStart={0}
//                     valueEnd={skill.percentage}
//                     duration={1400}
//                     easingFunction={easeQuadInOut}
//                   >
//                     {(value) => (
//                       <CircularProgressbar
//                         value={value}
//                         text={`${skill.percentage}%`}
//                         styles={buildStyles({
//                           pathTransitionDuration: 0.15,
//                           pathColor: `#3B82F6`,
//                           textColor: '#1F2937',
//                           trailColor: '#E5E7EB',
//                           backgroundColor: '#F3F4F6',
//                         })}
//                       />
//                     )}
//                   </AnimatedProgressProvider>
//                 </div>
//               </div>
//               <div className="skill-name">
//                 {skill.name}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Skills;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './skills.css'; // Make sure to create this CSS file

// function Skills() {
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/skills/')
//       .then((res) => {
//         console.log("Backend response:", res.data); // Debug log
//         setSkills(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching skills:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <section className="skills-section">
//         <div className="skills-container">
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p className="loading-text">Loading skills...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="skills-section">
//       <div className="skills-container">
//         <h2 className="skills-title">My Skills</h2>
        
//         <div className="skills-grid">
//           {skills.map((skill, index) => (
//             <div key={index} className="skill-item">
//               {/* Hexagon Container */}
//               <div className="hexagon-container">
//                 {/* Outer Hexagon (Background) */}
//                 <div className="hexagon-outer"></div>
                
//                 {/* Inner Hexagon (Content Area) */}
//                 <div className="hexagon-inner">
//                   <div className="hexagon-content">
//                     <span className="skill-percentage">
//                       {skill.percentage}%
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Glow Effect */}
//                 <div className="hexagon-glow"></div>
//               </div>
              
//               {/* Skill Name */}
//               <span className="skill-name">
//                 {skill.name}
//               </span>
              
//               {/* Optional: Skill Category */}
//               {skill.category && (
//                 <span className="skill-category">
//                   {skill.category}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
        
//         {/* No skills message */}
//         {skills.length === 0 && !loading && (
//           <div className="no-skills">
//             <p>No skills found. Please check your Django backend.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Skills;