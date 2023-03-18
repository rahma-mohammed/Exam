
export class Contact{
    constructor(){
        this.clearall()
        $(".ContactUs").fadeIn(100)
        let name = document.getElementById("name")
    }
    getsubmitBtn()
    {       
       $("#ContactUs input").keyup((e) =>{
           if(e.target.id == "name")
           {
             if(this.NameValid(e.target.value))
             {
                $("#name").addClass("is-valid").removeClass("is-invalid")
                $("#nameValid").addClass("d-none").removeClass("d-block")
             }
             else{
                $("#name").addClass("is-invalid").removeClass("is-valid")
                $("#nameValid").addClass("d-block").removeClass("d-none")
             }
           }
          else if(e.target.id == "email")
           {
             if(this.EmailValid(e.target.value))
             {
                $("#email").addClass("is-valid").removeClass("is-invalid")
                $("#emailValid").addClass("d-none").removeClass("d-block")
             }
             else{
                $("#email").addClass("is-invalid").removeClass("is-valid")
                $("#emailValid").addClass("d-block").removeClass("d-none")
             }
           }
          else if(e.target.id == "phone")
           {
             if(this.PhoneValid(e.target.value))
             {
                $("#phone").addClass("is-valid").removeClass("is-invalid")
                $("#phoneValid").addClass("d-none").removeClass("d-block")
             }
             else{
                $("#phone").addClass("is-invalid").removeClass("is-valid")
                $("#phoneValid").addClass("d-block").removeClass("d-none")
             }
           }
          else if(e.target.id == "Age")
           {
             if(this.AgeValid(e.target.value))
             {
                $("#Age").addClass("is-valid").removeClass("is-invalid")
                $("#AgeValid").addClass("d-none").removeClass("d-block")
             }
             else{
                $("#Age").addClass("is-invalid").removeClass("is-valid")
                $("#AgeValid").addClass("d-block").removeClass("d-none")
             }
           }
          else if(e.target.id == "password")
           {
             if(this.PasswordValid(e.target.value))
             {
                $("#password").addClass("is-valid").removeClass("is-invalid")
                $("#passwordValid").addClass("d-none").removeClass("d-block")
             }
             else{
                $("#password").addClass("is-invalid").removeClass("is-valid")
                $("#passwordValid").addClass("d-block").removeClass("d-none")
             }
           }
          else if(e.target.id == "RePassword")
           {
             if(this.RePasswordValid(e.target.value))
             {
                $("#RePassword").addClass("is-valid").removeClass("is-invalid")
                $("#RePasswordValid").addClass("d-none").removeClass("d-block")
             }
             else{
                $("#RePassword").addClass("is-invalid").removeClass("is-valid")
                $("#RePasswordValid").addClass("d-block").removeClass("d-none")
             }
           }
        })
       
    }
    clearall() {
        $(".Category").fadeOut(100)
        $(".ProductDetails").fadeOut(100)
        $(".Area").fadeOut(500)
    }
     NameValid(value) {
        return /^[a-zA-Z ]+$/.test(value)
    }
    
    EmailValid(value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }
    
     PhoneValid(value) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)
    }
    
     AgeValid(value) {
        return /^[1-9][0-9]?$|^100$/.test(value)
    }
    PasswordValid(value) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
    }
    
    
     RePasswordValid(REPassword) {
        if(document.getElementById("password").value)
        return document.getElementById("password").value == REPassword
    }
    
}