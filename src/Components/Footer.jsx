import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div>
      {/***********************************
      Footer start
  ************************************/}
  <div className="footer">
    <div className="copyright">
      <p>
      Copyright &copy; 
                                <script type="text/javascript ">
                                    document.write(new Date().getFullYear());
                                </script>
                                <NavLink to="/" class="">Brit Fintech Awards </NavLink> All Rights Reserved.
                                | Powered By <NavLink to="https://www.calyx-solutions.com/"  target="_blank ">
                                    Calyx Solutions.
                                </NavLink>
      
      
      
      </p>
    </div>
  </div>
  {/***********************************
      Footer end
  ************************************/}
    </div>
  )
}

export default Footer
