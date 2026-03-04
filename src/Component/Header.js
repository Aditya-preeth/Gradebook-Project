/* eslint-disable jsx-a11y/alt-text */
import './CSS/Header.css';
import Photo from './Photo.jpeg';
import Photo1 from './Photo1.jpeg';
 
function Header() {
  const currentDate = new Date().toLocaleDateString();
  return (
    <div>
      <nav className="book">
        <img src={Photo} />
        <span>Gradebook</span>
      </nav>
      <div className="group">
        <center>{<img src={Photo1}/>}</center>
        <h3>Professor's Name:  Sandeep Kaur </h3>
        <h3>College Name:  Lovely Professional University</h3>
        <h3>Department:  Computer Science and Engineering</h3>
        <h3>Title - Grading Digital Book</h3>
        <h3>Date - {currentDate}</h3>
        <h3>Semester - Final Semester</h3>
        <h3>Section - K19EF</h3>
        <h3>Group - 1</h3>
      </div>
    </div>
  );
}
export default Header;
