import "../sideBar.css";

export default function SideBar () {
    return (
        
  
  
       <div className="area">
       <nav className="main-menu">
            <ul>
                <li>
                   
                </li>
                <li className="has-subnav">
                    <a href="#">
                        <i className="fa fa-globe fa-2x"></i>
                        <span className="nav-text">
                            sort by price
                        </span>
                    </a>
                    
                </li>
                <li className="has-subnav">
                    <a href="#">
                       <i className="fa fa-comments fa-2x"></i>
                        <span className="nav-text">
                            sort by category
                        </span>
                    </a>
                    
                </li>
                <li className="has-subnav">
                    <a href="#">
                       <i className="fa fa-camera-retro fa-2x"></i>
                        <span className="nav-text">
                            brands
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-film fa-2x"></i>
                        <span className="nav-text">
                            ...
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-book fa-2x"></i>
                        <span className="nav-text">
                           ...
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                       <i className="fa fa-cogs fa-2x"></i>
                        <span className="nav-text">
                            ...
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                        <i className="fa fa-map-marker fa-2x"></i>
                        <span className="nav-text">
                            ...
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                       <i className="fa fa-info fa-2x"></i>
                        <span className="nav-text">
                            ...
                        </span>
                    </a>
                </li>
            </ul>

           
        </nav>
        </div>
    );
}