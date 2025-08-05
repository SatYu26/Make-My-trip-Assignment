const TicketController = require('./TicketController');
const assert = require('assert');

describe('TicketController', () => {
    it('should create a ticket', () => {
        const ticketData = { title: 'Test Ticket', description: 'This is a test ticket.' };
        const result = TicketController.createTicket(ticketData);
        assert.strictEqual(result.title, ticketData.title);
    });

    it('should retrieve a ticket', () => {
        const ticketId = 1;
        const result = TicketController.getTicket(ticketId);
        assert.strictEqual(result.id, ticketId);
    });

    it('should update a ticket', () => {
        const ticketId = 1;
        const updatedData = { title: 'Updated Ticket' };
        const result = TicketController.updateTicket(ticketId, updatedData);
        assert.strictEqual(result.title, updatedData.title);
    });

    it('should delete a ticket', () => {
        const ticketId = 1;
        const result = TicketController.deleteTicket(ticketId);
        assert.strictEqual(result.success, true);
    });
});