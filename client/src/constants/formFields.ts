const loginFieldsConstants = [
    {
        labelText : "Email address",
        labelFor : "email-address",
        id : "email-address",
        name : "email",
        type : "email",
        autoComplete : "email",
        isRequired : true,
        placeholder : "type your email address"
    },
    {
        labelText : "Password",
        labelFor : "password",
        id : "password",
        name : "password",
        type : "password",
        autoComplete : "current-password",
        isRequired : true,
        placeholder : "type your password"
    }
]

const signupFieldsConstants = [
    {
        labelText : "Username",
        labelFor : "username",
        id : "username",
        name : "username",
        type : "text",
        autoComplete : "username",
        isRequired : true,
        placeholder : "create a username"
    },
    {
        labelText : "Email address",
        labelFor : "email-address",
        id : "email-address",
        name : "email",
        type : "email",
        autoComplete : "email",
        isRequired : true,
        placeholder : "type your email address"
    },
    {
        labelText : "Password",
        labelFor : "password",
        id : "password",
        name : "password",
        type : "password",
        autoComplete : "current-password",
        isRequired : true,
        placeholder : "type your password"
    }, 
    {
        labelText : "Confirm Password",
        labelFor : "confirm-password",
        id : "confirm-password",
        name : "confirm-password",
        type : "password",
        autoComplete : "current-password",
        isRequired : true,
        placeholder : "confirm your password"
    }
]

export {
    loginFieldsConstants,
    signupFieldsConstants
}