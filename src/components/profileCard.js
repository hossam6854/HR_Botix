import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profileData }) => {
  return (
    <div className="profile-card">
      <h2>{profileData.name}</h2>
      <div className="recommended-job">
        <p><strong>Recommended Job:</strong> {profileData.recommended_job}</p>
      </div>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Phone:</strong> {profileData.phone}</p>

      <p><strong>Predicted Category:</strong> {profileData[" predicted_category"]}</p>
      <div>
        <strong>Skills:</strong>
        <ul>
          {profileData.extracted_skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Education:</strong>
        <ul>
          {profileData.extracted_education.map((education, index) => (
            <li key={index}>{education}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
