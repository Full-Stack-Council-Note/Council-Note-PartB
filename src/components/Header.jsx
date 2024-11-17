//import './Header.css';
import CNLogo from '/CN-logo.svg'

const styles = {
    headerStyle: {
    background: 'rgb(4, 1, 153)',
    height:'auto',
    textAlign: 'left',   
    flex: 'auto'
    
    },
    headingStyle: {
    fontSize: '80px',
    paddingLeft: '25px',
    paddingRight: '25px',
    marginTop:'1px',
    color: 'rgb(255, 230, 10)',
    flex: 'auto'
      
    },
  };
  
  
  function Header() {
    return (
     <div>
      <header style={styles.headerStyle} className="header"> 
        <h1 style={styles.headingStyle}><img src={CNLogo} alt="CN logo" width='80px' height='80px'/> CouncilNote</h1>     
      </header>
      </div>   
    );
  }
  
  export default Header;