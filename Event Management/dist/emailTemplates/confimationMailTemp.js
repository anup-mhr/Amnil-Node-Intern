"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmationMailTemp = void 0;
const confirmationMailTemp = (event, username) => {
    return `
    <mjml>
    <mj-body>
        <mj-container>
        <mj-section>
            <mj-column>
            <mj-text font-size="20px" font-weight="bold" color="#333333" align="center" padding-bottom="20px">Thank You for Registering!</mj-text>
            <mj-text font-size="16px" color="#666666" padding-bottom="20px">Dear ${username},</mj-text>
            <mj-text font-size="16px" color="#666666" padding-bottom="20px">Thank you for registering for ${event.title}! We are thrilled to have you join us.</mj-text>
            <mj-text font-size="16px" color="#666666" padding-bottom="20px">Here are the details of your registration:</mj-text>
            <mj-table padding-bottom="20px" font-size="16px">
                <tr style="border-bottom:1px solid #CCCCCC;">
                <td style="padding:10px;">Event:</td>
                <td style="padding:10px;">${event.title}</td>
                </tr>
                <tr style="border-bottom:1px solid #CCCCCC;">
                <td style="padding:10px;">Date:</td>
                <td style="padding:10px;">${event.event_date}</td>
                </tr>
                <tr style="border-bottom:1px solid #CCCCCC;">
                <td style="padding:10px;">Location:</td>
                <td style="padding:10px;">${event.description}</td>
                </tr>
            </mj-table>
            <mj-text font-size="16px" color="#666666" padding-bottom="20px">We look forward to seeing you at the event!</mj-text>
            <mj-button background-color="#007bff" color="white" href="[Event URL]" align="center" font-size="16px" padding="20px 0px" border-radius="5px">View Event Details</mj-button>
            </mj-column>
        </mj-section>
        </mj-container>
    </mj-body>
    </mjml>
    `;
};
exports.confirmationMailTemp = confirmationMailTemp;
