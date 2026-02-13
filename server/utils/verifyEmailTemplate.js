const verifyEmailTemplate=({name,url})=>{
    return`
    <p>dear ${name}</p>
    <p>thanku for registering in blinkit </p>
    <a href=${url} style="color:white;background:#71263,:marging-top:10px,padding:20px des">
    verify Email
    </a>
    
    `

}

export default verifyEmailTemplate