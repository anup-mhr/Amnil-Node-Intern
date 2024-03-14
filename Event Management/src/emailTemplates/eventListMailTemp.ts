import { Event } from "../models/Event";

export const eventListMailTemp = (eventList: Event[]): string => {
  return `
    <mjml>
    <mj-body>
        <mj-container>
        <mj-section>
            <mj-column>
            <mj-text font-size="20px" font-weight="bold" color="#333333" align="center" padding-bottom="20px">Today's Events</mj-text>
            <mj-text font-size="16px" color="#666666" padding-bottom="20px">Dear Admin,</mj-text>
            <mj-text font-size="16px" color="#666666" padding-bottom="20px">Here is the list of events scheduled for today:</mj-text>
            <mj-table padding-bottom="20px" font-size="16px">
                <tr style="border-bottom:1px solid #CCCCCC;">
                    <td style="padding:10px;">Event</td>
                    <td style="padding:10px;">Time</td>
                    <td style="padding:10px;">Description</td>
                </tr>
                ${eventList.map((event: Event) => {
                  return `
                    <tr style="border-bottom:1px solid #CCCCCC;">
                        <td style="padding:10px;">${event.title}</td>
                        <td style="padding:10px;">${event.event_date.toDateString()}M</td>
                        <td style="padding:10px;">${event.description}</td>
                    </tr>
                `;
                })}
                
            </mj-table>
            <mj-text font-size="16px" color="#666666" padding-bottom="20px">Please review and manage these events accordingly.</mj-text>
            </mj-column>
        </mj-section>
        </mj-container>
    </mj-body>
    </mjml>
      `;
};
