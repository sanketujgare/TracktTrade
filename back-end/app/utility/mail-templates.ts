const userRegistration = (
    to: string,
    testPassword: string,
    username: string,
    from: string
) => {
    return {
        to: [to],
        subject: `Welcome to Our System!`,
        text: `<h3>Welcome to Track Trade !</h3>
            <p> We are thrilled to have you on board.<br>
            Your account has been successfully created, and you can now access our system using the following credentials:<br>

            <b>Username: ${username}</b><br>
            <b>Temporary Password:${testPassword} </b><br>
            Thank you for joining us. We look forward to supporting you!<br>
           <br>
            Best regards,<br>
            Track trade
            </p>`,
        from,
    };
};

export const newProduct = (
    to: string[],
    productName: string,
    description: string,
    from: string
) => {
    return {
        to,
        subject: `Exciting News! New Product Now Available`,
        text: `<h3>Dear User's,</h3><br><br>
       <p> We are thrilled to announce the addition of an exciting new product to our lineup !<br>
        troducing: <br>
        Name : <b>${productName}<br></b>
        Description: <b>${description}<br></b>
        <br>
        Best regards,<br>
        Track trade
        </p>`,
        from,
    };
};
export default {
    userRegistration,
    newProduct,
};
