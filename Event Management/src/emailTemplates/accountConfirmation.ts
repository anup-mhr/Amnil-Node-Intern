export const accountConfirmation = (verifyLink: string): string => {
  return `
        <mjml>
        <mj-head>
            <mj-title>Account Confirmation</mj-title>
            <mj-attributes>
            <mj-all font-family="Arial, sans-serif"></mj-all>
            </mj-attributes>
        </mj-head>
        <mj-body>
            <mj-container>
            <mj-section>
                <mj-column>
                <mj-text>
                    Thank you for creating an account with us. Your account has been successfully created.
                </mj-text>
                <mj-button href="<%= ${verifyLink} %>" background-color="#007bff" color="white" font-family="Arial, sans-serif" font-size="16px" padding="15px 30px" border-radius="5px">
                    Verify Account
                </mj-button>
                </mj-column>
            </mj-section>
            </mj-container>
        </mj-body>
        </mjml>
    `;
};
