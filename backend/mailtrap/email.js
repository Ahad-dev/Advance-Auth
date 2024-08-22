import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE ,PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{email}];
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',verificationToken),
            category: "Verification Email",
        });
        console.log("Email send Successfully ",response);
    }catch(error){
        console.log("Email Sending Verfication Error ",error);
        throw new Error(`Email Sending Verfication Error: ${error}`);
        

    }
}

export const sendWelcomeEmail = async (email,name) => {
    const recipients = [{email}];
    try{
        const result = await mailtrapClient.send({
            from: sender,
            to: recipients,
           
            template_uuid: "b2d85699-059a-4992-8ca8-69e1037a0a3c",
            template_variables: {
              company_info_name: "Auth Company",
              name: name
            },
        });
        console.log("Email send Successfully ",result);
    }catch(error){
        console.log("Email Sending Welcome Error ",error);
        throw new Error(`Email Sending Welcome Error: ${error}`);
        

    }
}

export const sendResetPasswordEmail = async (email,restUrl)=>{
    const recipients = [{email}];
    try{
        const result = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Reset Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',restUrl),
            category: "Reset Password",
        });
        console.log("Rest Password Email send Successfully ",result);
    }catch(error){
        console.log("Email Sending Reset Password Error ",error);
        throw new Error(`Email Sending Reset Password Error: ${error}`);
        

    }
}

export const sendPasswordResetSuccessEmail = async (email) => {
    const recipients = [{email}];
    try{
        const result = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        console.log("Password Reset Success Email send Successfully ",result);
    }catch(error){
        console.log("Email Sending Password Reset Success Error ",error);
        throw new Error(`Email Sending Password Reset Success Error: ${error}`);  

    }
}