import React from 'react';  


export default function Navbar() {  
    return (  
        <nav style={{ backgroundColor: "gray", color: "white", padding: "10px" }}>  
            <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0 }}>  
                <li><a href="#" style={{ color: "black", textDecoration: "none" }}>Inicio</a></li>  
                <li><a href="#" style={{ color: "black", textDecoration: "none" }}>Carrito</a></li>  
            </ul>  
        </nav>  
    );  
}  

